import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useMemo } from "react";
import { HardCompState, ComponentCategory, Componente } from "../types/store";
import { checkSocket, checkRamGeneration, checkPowerLimit } from "../lib/engine/specification";

const EVICTION_DAYS = 7;
const DEFAULT_BUDGET = 850;

const getInitialState = () => ({
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
});

export const useHardCompStore = create<HardCompState>()(
  persist(
    (set, get) => ({
      ...getInitialState(),

      selectAnchor: (category: ComponentCategory) => {
        set(() => ({
          anchorComponent: category,
          isColdStart: false,
          timestamp: new Date().toISOString(),
        }));
      },

      selectComponent: (category: ComponentCategory, component: Componente) => {
        set((state) => ({
          selectedComponents: {
            ...state.selectedComponents,
            [category]: component,
          },
          timestamp: new Date().toISOString(),
        }));
      },

      clearBuild: () => {
        set(() => getInitialState());
      },

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
          }
        }
      },

      setBudget: (budget: number) => set({ budget }),
      loadPrebuiltSetup: (componentsMap, anchor) => set(() => ({
        selectedComponents: componentsMap,
        anchorComponent: anchor,
        isColdStart: false,
        timestamp: new Date().toISOString()
      })),
      applyChange: (action, purgedCategories) => set((state) => {
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
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.hydrateStore();
        }
      },
    }
  )
);

export const useBuildMetrics = () => {
  const selectedComponents = useHardCompStore((state) => state.selectedComponents);
  
  return useMemo(() => {
    const componentsList = Object.values(selectedComponents).filter((c): c is Componente => c !== null);
    const cpu = selectedComponents.CPU;
    const mobo = selectedComponents.Mobo;
    const ram = selectedComponents.RAM;
    const psu = selectedComponents.PSU;

    const totalInvestment = componentsList.reduce((acc, comp) => acc + comp.preco, 0);
    const totalTDP = componentsList.reduce((acc, comp) => acc + comp.tdp_maximo, 0);

    let isBuildValid = true;
    let errorMessage: string | null = null;

    if (cpu && mobo && !checkSocket(cpu, mobo)) {
      isBuildValid = false;
      errorMessage = "builder.messages.msg001";
    }

    if (mobo && ram && !checkRamGeneration(mobo, ram)) {
      isBuildValid = false;
      errorMessage = "builder.messages.msg003";
    }

    const powerCheck = checkPowerLimit(componentsList, psu);
    if (psu && !powerCheck.valid) {
      isBuildValid = false;
      errorMessage = "builder.messages.msg002";
    }

    return {
      totalInvestment,
      totalTDP,
      psuTargetLimit: psu ? psu.tdp_maximo * 0.8 : 0,
      isBuildValid,
      errorMessage
    };
  }, [selectedComponents]);
};
