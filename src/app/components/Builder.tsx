import React from "react";
import { Link, useSearchParams } from "react-router";
import { useTranslation } from "../lib/i18n";
import { useHardCompStore } from "../store/useHardCompStore";
import { ChevronLeft } from "lucide-react";
import { ReactiveMetricsBar } from "./Builder/ReactiveMetricsBar";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "./ui/sheet";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "./ui/alert-dialog";
import { CATALOGO_HARDWARE } from "../lib/engine/mockData";
import { ComponentCard } from "./Builder/ComponentCard";
import { getCascadingPurge, validatePayloadIntegrity } from "../lib/engine/specification";
import { decodeBuildFromURL } from "../lib/engine/serializer";
import { Componente, ComponentCategory } from "../types/store";
import { toast } from "sonner";
import { DataEngineErrorBoundary } from "./ErrorBoundary";
import { useCatalogEvaluator } from "../lib/engine/useCatalogEvaluator";
import { mockCuratedBuilds } from "../lib/engine/mockCuratedBuilds";

import { CategoryGrid } from "./Builder/CategoryGrid";
import { TopologySidebar } from "./Builder/TopologySidebar";
import { TopologyInterceptModal } from "./Builder/TopologyInterceptModal";

export function useHydrationGuard() {
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated;
}

export function Builder() {
  const hasHydrated = useHydrationGuard();
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const loadPrebuiltSetup = useHardCompStore((state) => state.loadPrebuiltSetup);
  
  const isColdStart = useHardCompStore((state) => state.isColdStart);
  const selectedComponents = useHardCompStore((state) => state.selectedComponents);
  const anchorComponent = useHardCompStore((state) => state.anchorComponent);
  const applyChange = useHardCompStore((state) => state.applyChange);
  const wasFromRecommendation = useHardCompStore((state) => state.was_from_recommendation);
  const setWasFromRecommendation = useHardCompStore((state) => state.setWasFromRecommendation);
  const setPendingTopologyAction = useHardCompStore((state) => state.setPendingTopologyAction);

  const evaluatedCatalog = useCatalogEvaluator(CATALOGO_HARDWARE, selectedComponents, anchorComponent);

  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [activeSheetCategory, setActiveSheetCategory] = React.useState<ComponentCategory | null>(null);

  const [pendingImportParam, setPendingImportParam] = React.useState<string | null>(null);
  const [confirmImportDialogOpen, setConfirmImportDialogOpen] = React.useState(false);

  const executeImport = React.useCallback((param: string) => {
    const importedComponents = decodeBuildFromURL(param);

    if (importedComponents.length === 0 || !validatePayloadIntegrity(importedComponents)) {
      toast.error(t('MSG-006'));
      setSearchParams({}, { replace: true });
      return;
    }

    const componentsMap: Record<ComponentCategory, Componente | null> = {
      CPU: null, Mobo: null, RAM: null, GPU: null, Storage: null, PSU: null
    };
    importedComponents.forEach(comp => {
      componentsMap[comp.categoria] = comp;
    });

    const anchor = componentsMap.CPU ? 'CPU' : (componentsMap.Mobo ? 'Mobo' : null);
    loadPrebuiltSetup(componentsMap, anchor || 'CPU', false);
    
    // BARREIRA DE UX (Obrigatório): Limpeza no Sucesso para evitar o Bug do Refresh
    setSearchParams({}, { replace: true });
    toast.success(t('MSG-028'));
  }, [loadPrebuiltSetup, setSearchParams, t]);

  React.useEffect(() => {
    // BARREIRA DE INFRAESTRUTURA: Impede a execução com dados padrão transientes
    if (!hasHydrated) return;

    const buildParam = searchParams.get('build');
    const curatedParam = searchParams.get('curated');

    if (buildParam) {
      const importedComponents = decodeBuildFromURL(buildParam);

      if (importedComponents.length === 0 || !validatePayloadIntegrity(importedComponents)) {
        toast.error(t('MSG-006'));
        setSearchParams({}, { replace: true });
        return;
      }

      if (!isColdStart) {
        setPendingImportParam(buildParam);
        setConfirmImportDialogOpen(true);
      } else {
        executeImport(buildParam);
      }
    } else if (curatedParam) {
      const curatedBuild = mockCuratedBuilds.find(b => b.id_build_curada === curatedParam);
      if (curatedBuild) {
        const componentsMap: Record<ComponentCategory, Componente | null> = {
          CPU: null, Mobo: null, RAM: null, GPU: null, Storage: null, PSU: null
        };
        Object.entries(curatedBuild.matriz_componentes).forEach(([cat, id]) => {
          if (id) {
            const comp = CATALOGO_HARDWARE.find(c => c.id === id);
            if (comp) {
              componentsMap[cat as ComponentCategory] = comp;
            }
          }
        });
        const anchor = componentsMap.CPU ? 'CPU' : (componentsMap.Mobo ? 'Mobo' : null);
        loadPrebuiltSetup(componentsMap, anchor || 'CPU', false);
        setSearchParams({}, { replace: true });
        toast.success(t('MSG-028'));
      } else {
        setSearchParams({}, { replace: true });
      }
    }
  }, [searchParams, isColdStart, executeImport, hasHydrated, t, setSearchParams, loadPrebuiltSetup]);

  React.useEffect(() => {
    if (hasHydrated && wasFromRecommendation) {
      toast.success(t('MSG-028'));
      setWasFromRecommendation(false);
    }
  }, [hasHydrated, wasFromRecommendation, setWasFromRecommendation, t]);

  React.useEffect(() => {
    const handleSync = () => {
      toast.info(t('builder.messages.syncCrossTab' as any));
    };
    window.addEventListener('APP_SYNC_TRIGGERED', handleSync);
    return () => window.removeEventListener('APP_SYNC_TRIGGERED', handleSync);
  }, [t]);

  const handleConfirmImport = () => {
    if (pendingImportParam) {
      executeImport(pendingImportParam);
    }
    setPendingImportParam(null);
    setConfirmImportDialogOpen(false);
  };

  const handleCancelImport = () => {
    setPendingImportParam(null);
    setConfirmImportDialogOpen(false);
    setSearchParams({});
  };

  const handleRemoveAttempt = React.useCallback((catId: ComponentCategory) => {
    const purges = getCascadingPurge(useHardCompStore.getState(), { type: 'REMOVE', category: catId });
    if (purges.length > 0) {
      setPendingTopologyAction({
        type: 'REMOVE',
        targetCategory: catId,
        orphanedCategories: purges,
        orphans: purges
      });
    } else {
      applyChange({ type: 'REMOVE', category: catId }, []);
    }
  }, [setPendingTopologyAction, applyChange]);

  const handleReplaceAttempt = React.useCallback((catId: ComponentCategory, comp: Componente) => {
    const purges = getCascadingPurge(useHardCompStore.getState(), { type: 'REPLACE', category: catId, newComponent: comp });
    if (purges.length > 0) {
      setPendingTopologyAction({
        type: 'SWAP',
        targetCategory: catId,
        newComponent: comp,
        orphanedCategories: purges,
        orphans: purges
      });
    } else {
      applyChange({ type: 'REPLACE', category: catId, newComponent: comp }, []);
      setSheetOpen(false);
    }
  }, [setPendingTopologyAction, applyChange, setSheetOpen]);

  const handleOpenInventory = React.useCallback((catId: ComponentCategory) => {
    setActiveSheetCategory(catId);
    setSheetOpen(true);
  }, [setActiveSheetCategory, setSheetOpen]);

  if (!hasHydrated) {
    return <div className="w-screen h-screen bg-[#121212] animate-pulse" />;
  }

  const renderInventory = () => {
    if (!activeSheetCategory) return null;
    const inventory = evaluatedCatalog.filter(item => item.component.categoria === activeSheetCategory);

    return inventory.map(({ component, isInvalid, conflictReason }) => {
      return (
        <ComponentCard 
          key={component.id}
          componente={component}
          isInvalid={isInvalid}
          motivoErro={conflictReason ? t(conflictReason as any) : undefined}
          onSelect={() => handleReplaceAttempt(component.categoria, component)}
        />
      );
    });
  };

  return (
    <div className="w-screen h-screen bg-[#121212] font-sans text-white flex flex-col overflow-hidden relative">
      <DataEngineErrorBoundary 
        fallback={
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#121212] text-center p-10 border border-[#FF3B30]/30 rounded-2xl m-4">
            <span className="text-[#FF3B30] font-mono text-sm font-bold uppercase tracking-wider mb-2">{t('builder.recovery.systemMode' as any)}</span>
            <h3 className="text-xl font-bold text-white mb-2">{t('builder.recovery.title' as any)}</h3>
            <p className="text-white/60 text-sm max-w-md font-sans mb-6">
              {t('builder.recovery.description' as any)}
            </p>
            <button 
              onClick={() => {
                useHardCompStore.getState().clearBuild();
                window.location.reload();
              }}
              className="px-6 py-2.5 bg-[#FF3B30] hover:bg-[#FF3B30]/80 text-white rounded-lg text-sm font-semibold transition-all shadow-[0_0_15px_rgba(255,59,48,0.2)] cursor-pointer"
            >
              {t('builder.recovery.reset' as any)}
            </button>
          </div>
        }
      >
        <div className="flex-1 flex flex-row overflow-hidden pb-24">
          <main className="flex-1 flex flex-col overflow-y-auto p-10 relative">
            <div className="max-w-5xl mx-auto w-full flex flex-col h-full">
              <header className="mb-10 flex flex-col md:flex-row items-start md:items-center gap-4">
                <Link 
                  to="/hub" 
                  className="group flex items-center gap-2 text-white/50 hover:text-white hover:bg-white/5 px-3 py-2 rounded-lg transition-colors shrink-0"
                >
                  <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                  <span className="text-sm font-medium font-sans">{t('builder.header.returnHub')}</span>
                </Link>
                <div>
                  <div className="text-xs font-mono text-white/40 tracking-wider mb-3 uppercase">
                    {t('builder.header.breadcrumb')}
                  </div>
                  <h1 className="text-4xl font-bold text-white tracking-tight mb-3">
                    {t('builder.header.title')}
                  </h1>
                  <p className="text-white/50 text-base max-w-2xl leading-relaxed">
                    {t('builder.header.subtitle')}
                  </p>
                </div>
              </header>

              <CategoryGrid 
                isColdStart={isColdStart}
                selectedComponents={selectedComponents}
                onRemoveAttempt={handleRemoveAttempt}
                onOpenInventory={handleOpenInventory}
              />
            </div>
          </main>

          <TopologySidebar 
            selectedComponents={selectedComponents}
            anchorComponent={anchorComponent}
          />
        </div>

        <ReactiveMetricsBar />

        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetContent className="bg-[#121212] border-white/10 text-white w-full sm:max-w-md overflow-y-auto">
            <SheetHeader className="mb-6">
              <SheetTitle className="text-white text-xl">
                {activeSheetCategory ? t(`builder.categories.${activeSheetCategory.toLowerCase() === 'storage' ? 'storage' : activeSheetCategory.toLowerCase() === 'psu' ? 'powerSupply' : activeSheetCategory.toLowerCase() === 'gpu' ? 'graphics' : activeSheetCategory.toLowerCase() === 'ram' ? 'memory' : activeSheetCategory.toLowerCase() === 'mobo' ? 'selectMotherboard' : 'selectProcessor'}` as any) : t('builder.inventory.title' as any)}
              </SheetTitle>
              <SheetDescription className="text-white/50">
                {t('builder.badges.pendingInput')}
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col gap-4">
              {renderInventory()}
            </div>
          </SheetContent>
        </Sheet>

        <TopologyInterceptModal />

        <AlertDialog open={confirmImportDialogOpen} onOpenChange={setConfirmImportDialogOpen}>
          <AlertDialogContent className="bg-[#1E1E1E] border-white/10 shadow-2xl">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white text-xl">
                {t('builder.alerts.importConfirmTitle')}
              </AlertDialogTitle>
              <AlertDialogDescription className="text-white/60 text-base leading-relaxed">
                {t('builder.alerts.importConfirmDesc')}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-6 border-t border-white/5 pt-4">
              <AlertDialogCancel 
                onClick={handleCancelImport}
                className="bg-transparent text-white border-white/10 hover:bg-white/5 cursor-pointer"
              >
                {t('builder.actions.cancel')}
              </AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleConfirmImport}
                className="bg-[#007BFF] text-white hover:bg-[#0056b3] shadow-[0_0_15px_rgba(0,123,255,0.2)] hover:shadow-[0_0_25px_rgba(0,123,255,0.4)] border-transparent transition-all cursor-pointer"
              >
                {t('builder.actions.confirm')}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DataEngineErrorBoundary>
    </div>
  );
}
