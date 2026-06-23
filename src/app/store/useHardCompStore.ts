import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useMemo } from "react";
import { HardCompState, ComponentCategory, Componente, TopologicalIntercept, AuditLog } from "../types/store";
import { checkSocket, checkRamGeneration, checkPowerLimit } from "../lib/engine/specification";
import { CATALOGO_HARDWARE } from "../lib/engine/mockData";

const EVICTION_DAYS = 7;
const DEFAULT_BUDGET = 850;

const getInitialState = () => ({
  auditLogs: [] as AuditLog[],
  selectedComponents: {
    CPU: null,
    Mobo: null,
    RAM: null,
    GPU: null,
    Storage: null,
    PSU: null,
  },
  anchorComponent: null,
  isColdStart: true,
  timestamp: new Date().toISOString(),
  budget: DEFAULT_BUDGET,
  was_from_recommendation: false,
  pendingTopologyAction: null as TopologicalIntercept | null,
});

export const useHardCompStore = create<HardCompState>()(
  persist(
    (set, get) => ({
      ...getInitialState(),

      selectAnchor: (category: ComponentCategory) => {
        if (get().pendingTopologyAction !== null) return;
        set(() => ({
          anchorComponent: category,
          isColdStart: false,
          timestamp: new Date().toISOString(),
        }));
      },

      selectComponent: (category: ComponentCategory, component: Componente) => {
        if (get().pendingTopologyAction !== null) return;
        set((state) => ({
          selectedComponents: {
            ...state.selectedComponents,
            [category]: component,
          },
          timestamp: new Date().toISOString(),
        }));
      },

      clearBuild: () => {
        set((state) => ({ ...getInitialState(), auditLogs: state.auditLogs }));
        get().addAuditLog('CLEAR_BUILD', 'Estado Resetado');
      },

      addAuditLog: (action, diff) => set((state) => {
        const newLog = { timestamp: new Date().toISOString(), action, diff };
        const newLogs = [newLog, ...state.auditLogs].slice(0, 10);
        return { auditLogs: newLogs };
      }),

      hydrateStore: () => {
        const state = get();
        if (state.timestamp) {
          const storedDate = new Date(state.timestamp);
          const currentDate = new Date();
          const diffTime = Math.abs(currentDate.getTime() - storedDate.getTime());
          const diffDays = diffTime / (1000 * 60 * 60 * 24);

          if (diffDays > EVICTION_DAYS) {
            console.warn("MSG-039: Eviction Policy Triggered. Store payload expired.");
            get().clearBuild();
            get().addAuditLog('EVICTION', 'Payload Expirado');
            return;
          }
        }
        
        // Reconciliação Transacional de Preços (Offline-First Seguro)
        const newComps = { ...state.selectedComponents };
        let hasChanges = false;
        
        (Object.keys(newComps) as ComponentCategory[]).forEach(cat => {
          const comp = newComps[cat];
          if (comp) {
            const freshComp = CATALOGO_HARDWARE.find(c => c.id === comp.id);
            if (freshComp) {
              newComps[cat] = freshComp;
              hasChanges = true;
            } else {
              // Componente não existe mais no catálogo
              newComps[cat] = null;
              hasChanges = true;
            }
          }
        });

        if (hasChanges) {
          set({ selectedComponents: newComps });
          get().addAuditLog('REHYDRATE', 'Catálogo Reconciliado');
        } else {
          get().addAuditLog('REHYDRATE', 'Sem Alterações');
        }
      },

      setBudget: (budget: number) => set({ budget }),
      setWasFromRecommendation: (val: boolean) => set({ was_from_recommendation: val }),
      setPendingTopologyAction: (action) => set((state) => {
        if (state.pendingTopologyAction !== null && action !== null) return state;
        return { pendingTopologyAction: action };
      }),
      executeTopologyAction: () => {
        get().confirmTopologyAction();
      },
      confirmTopologyAction: () => set((state) => {
        if (!state.pendingTopologyAction) return state;
        
        const { type, targetCategory, newComponent, orphans, orphanedCategories } = state.pendingTopologyAction;
        const newSelection = { ...state.selectedComponents };
        
        const catsToRemove = orphans || orphanedCategories || [];
        catsToRemove.forEach(orphanCat => { newSelection[orphanCat] = null; });
        
        if (type === 'SWAP' && newComponent) {
          newSelection[targetCategory] = newComponent;
        } else if (type === 'REMOVE') {
          newSelection[targetCategory] = null;
        }
        
        // Barreira de Reversão de FSM: Se o carrinho esvaziou totalmente, reativa o Cold Start
        const hasActiveComponents = Object.values(newSelection).some(comp => comp !== null);
        let anchor = state.anchorComponent;

        if (!hasActiveComponents) {
          anchor = null;
        } else {
          if (type === 'SWAP' && (targetCategory === 'CPU' || targetCategory === 'Mobo')) {
            anchor = targetCategory;
          } else if (newSelection.CPU) {
            anchor = 'CPU';
          } else if (newSelection.Mobo) {
            anchor = 'Mobo';
          }
        }
        
        get().addAuditLog('CONFIRM_TOPOLOGY_ACTION', `Tipo: ${type}, Categoria: ${targetCategory}`);
        
        return { 
          selectedComponents: newSelection, 
          pendingTopologyAction: null,
          isColdStart: !hasActiveComponents, // Reverte a trava inicial automaticamente
          anchorComponent: anchor,
          timestamp: new Date().toISOString()
        };
      }),
      loadPrebuiltSetup: (componentsMap, anchor, wasFromRec = false) => set(() => ({
        selectedComponents: componentsMap,
        anchorComponent: anchor,
        isColdStart: false,
        was_from_recommendation: wasFromRec,
        timestamp: new Date().toISOString()
      })),
      applyChange: (action, purgedCategories) => set((state) => {
        if (state.pendingTopologyAction !== null) return state;
        const nextComps = { ...state.selectedComponents };
        if (action.type === 'REMOVE') {
          nextComps[action.category] = null;
        } else if (action.type === 'REPLACE' && action.newComponent) {
          nextComps[action.category] = action.newComponent;
        }

        purgedCategories.forEach(cat => {
          nextComps[cat] = null;
        });

        let isCold = state.isColdStart;
        let anchor = state.anchorComponent;

        if (!nextComps.CPU && !nextComps.Mobo) {
          isCold = true;
          anchor = null;
        } else {
          isCold = false;
          if (action.type === 'REPLACE' && (action.category === 'CPU' || action.category === 'Mobo')) {
            anchor = action.category;
          } else if (nextComps.CPU) {
            anchor = 'CPU';
          } else if (nextComps.Mobo) {
            anchor = 'Mobo';
          }
        }

        get().addAuditLog('APPLY_CHANGE', `Tipo: ${action.type}, Categoria: ${action.category}`);

        return {
          selectedComponents: nextComps,
          isColdStart: isCold,
          anchorComponent: anchor,
          timestamp: new Date().toISOString()
        };
      })
    }),
    {
      name: "hardcomp-storage",
      partialize: (state) => 
        Object.fromEntries(
          Object.entries(state).filter(
            ([key]) => !['auditLogs', 'pendingTopologyAction'].includes(key)
          )
        ),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.hydrateStore();
        }
      },
    }
  )
);

if (typeof window !== 'undefined') {
  window.addEventListener('storage', (event) => {
    if (event.key === 'hardcomp-storage') {
      useHardCompStore.persist.rehydrate();
      useHardCompStore.getState().addAuditLog('SYNC_CROSS_TAB', 'Reidratação Forçada');
      window.dispatchEvent(new Event('APP_SYNC_TRIGGERED'));
    }
  });

  (window as any).HardComp = {
    audit: () => console.table(useHardCompStore.getState().auditLogs)
  };
}
