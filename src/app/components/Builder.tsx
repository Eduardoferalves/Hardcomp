import React from "react";
import { Link, useSearchParams } from "react-router";
import { useTranslation } from "../lib/i18n";
import { useHardCompStore } from "../store/useHardCompStore";
import { 
  Cpu, 
  LayoutGrid, 
  Box, 
  HardDrive, 
  Monitor, 
  Zap,
  Lock,
  ChevronLeft,
  Trash
} from "lucide-react";
import { ReactiveMetricsBar } from "./Builder/ReactiveMetricsBar";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "./ui/sheet";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "./ui/alert-dialog";
import { CATALOGO_HARDWARE } from "../lib/engine/mockData";
import { ComponentCard } from "./Builder/ComponentCard";
import { checkSocket, checkRamGeneration, getCascadingPurge } from "../lib/engine/specification";
import { decodeBuildFromURL } from "../lib/engine/serializer";
import { Componente, ComponentCategory } from "../types/store";
import { toast } from "sonner";
import { DataEngineErrorBoundary } from "./ErrorBoundary";
import { useCatalogEvaluator } from "../lib/engine/useCatalogEvaluator";

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
  const pendingTopologyAction = useHardCompStore((state) => state.pendingTopologyAction);
  const setPendingTopologyAction = useHardCompStore((state) => state.setPendingTopologyAction);
  const executeTopologyAction = useHardCompStore((state) => state.executeTopologyAction);

  const evaluatedCatalog = useCatalogEvaluator(CATALOGO_HARDWARE, selectedComponents, anchorComponent);

  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [activeSheetCategory, setActiveSheetCategory] = React.useState<ComponentCategory | null>(null);

  const [pendingImportParam, setPendingImportParam] = React.useState<string | null>(null);
  const [confirmImportDialogOpen, setConfirmImportDialogOpen] = React.useState(false);

  const executeImport = React.useCallback((param: string) => {
    const decodedIds = decodeBuildFromURL(param);
    if (!decodedIds) {
      toast.error(t('builder.messages.importError' as any));
    } else {
      const componentsMap: Record<ComponentCategory, Componente | null> = {
        CPU: null, Mobo: null, RAM: null, GPU: null, Storage: null, PSU: null
      };
      
      decodedIds.forEach(id => {
        const comp = CATALOGO_HARDWARE.find(c => c.id === id);
        if (comp) {
          componentsMap[comp.categoria] = comp;
        }
      });

      const anchor = componentsMap.CPU ? 'CPU' : (componentsMap.Mobo ? 'Mobo' : null);
      loadPrebuiltSetup(componentsMap, anchor || 'CPU', false);
      toast.success(t('MSG-040'));
    }
    setSearchParams({});
  }, [loadPrebuiltSetup, setSearchParams, t]);

  React.useEffect(() => {
    // BARREIRA DE INFRAESTRUTURA: Impede a execução com dados padrão transientes
    if (!hasHydrated) return;

    const buildParam = searchParams.get('build');
    if (buildParam) {
      if (!isColdStart) {
        setPendingImportParam(buildParam);
        setConfirmImportDialogOpen(true);
      } else {
        executeImport(buildParam);
      }
    }
  }, [searchParams, isColdStart, executeImport, hasHydrated]);

  React.useEffect(() => {
    if (hasHydrated && wasFromRecommendation) {
      toast.success(t('MSG-028'));
      setWasFromRecommendation(false);
    }
  }, [hasHydrated, wasFromRecommendation, setWasFromRecommendation, t]);

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

  if (!hasHydrated) {
    return <div className="w-screen h-screen bg-[#121212] animate-pulse" />;
  }

  const allCategories = [
    { id: "CPU", label: t('builder.categories.selectProcessor'), icon: Cpu },
    { id: "Mobo", label: t('builder.categories.selectMotherboard'), icon: LayoutGrid },
    { id: "RAM", label: t('builder.categories.memory'), icon: Box },
    { id: "GPU", label: t('builder.categories.graphics'), icon: Monitor },
    { id: "Storage", label: t('builder.categories.storage'), icon: HardDrive },
    { id: "PSU", label: t('builder.categories.powerSupply'), icon: Zap },
  ] as const;

  const graphNodes = [
    t('builder.nodes.processor'), t('builder.nodes.motherboard'), t('builder.nodes.memory'), t('builder.nodes.graphics'), t('builder.nodes.storage'), t('builder.nodes.powerSupply')
  ];

  const handleRemoveAttempt = (catId: ComponentCategory) => {
    const purges = getCascadingPurge(useHardCompStore.getState(), { type: 'REMOVE', category: catId });
    if (purges.length > 0) {
      setPendingTopologyAction({
        type: 'REMOVE',
        targetCategory: catId,
        orphanedCategories: purges
      });
    } else {
      applyChange({ type: 'REMOVE', category: catId }, []);
    }
  };

  const handleReplaceAttempt = (catId: ComponentCategory, comp: Componente) => {
    const purges = getCascadingPurge(useHardCompStore.getState(), { type: 'REPLACE', category: catId, newComponent: comp });
    if (purges.length > 0) {
      setPendingTopologyAction({
        type: 'SWAP',
        targetCategory: catId,
        newComponent: comp,
        orphanedCategories: purges
      });
    } else {
      applyChange({ type: 'REPLACE', category: catId, newComponent: comp }, []);
      setSheetOpen(false);
    }
  };

  const confirmInterception = () => {
    executeTopologyAction();
    setSheetOpen(false);
  };

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
            <span className="text-[#FF3B30] font-mono text-sm font-bold uppercase tracking-wider mb-2">[SISTEMA EM MODO DE RECOVERY]</span>
            <h3 className="text-xl font-bold text-white mb-2">Falha crítica no processamento dos dados técnicos</h3>
            <p className="text-white/60 text-sm max-w-md font-sans mb-6">
              Detectamos dados incompatíveis ou corrompidos na configuração atual. Sua máquina foi pausada para segurança.
            </p>
            <button 
              onClick={() => {
                useHardCompStore.getState().clearBuild();
                window.location.reload();
              }}
              className="px-6 py-2.5 bg-[#FF3B30] hover:bg-[#FF3B30]/80 text-white rounded-lg text-sm font-semibold transition-all shadow-[0_0_15px_rgba(255,59,48,0.2)] cursor-pointer"
            >
              Resetar Configuração
            </button>
          </div>
        }
      >
        {/* Top Flex Container for Areas 1 and 2 */}
        <div className="flex-1 flex flex-row overflow-hidden pb-24">
          
          {/* AREA 1: MAIN CONTENT */}
          <main className="flex-1 flex flex-col overflow-y-auto p-10 relative">
            <div className="max-w-5xl mx-auto w-full flex flex-col h-full">
              {/* Top Header */}
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

              {/* The Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {allCategories.map((cat) => {
                  const Icon = cat.icon;
                  const isAnchorCandidate = cat.id === "CPU" || cat.id === "Mobo";
                  const isLocked = isColdStart && !isAnchorCandidate;
                  const isSelected = selectedComponents[cat.id as ComponentCategory] !== null;

                  if (isLocked) {
                    return (
                      <div 
                        key={cat.id} 
                        className="relative h-48 bg-[#1E1E1E]/50 backdrop-blur border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 opacity-40 cursor-not-allowed grayscale"
                      >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 px-4 py-2 bg-black/80 rounded-full border border-white/10 flex items-center gap-2 shadow-lg backdrop-blur-md">
                          <Lock className="w-3.5 h-3.5 text-white/70" />
                          <span className="text-xs font-medium text-white/90 whitespace-nowrap">{t('builder.badges.awaitingAnchor')}</span>
                        </div>

                        <div className="p-3 bg-white/5 rounded-full">
                          <Icon className="w-8 h-8 text-white/40" />
                        </div>
                        <span className="font-semibold text-lg text-white/50">
                          {cat.label}
                        </span>
                      </div>
                    );
                  }

                  return (
                    <div 
                      key={cat.id} 
                      className={`group relative h-48 ${isSelected ? 'bg-[#1E1E1E] border-[#007BFF]/50 shadow-xl' : 'bg-[#1E1E1E]/80 border-white/10 hover:border-[#007BFF]/50 hover:bg-[#1E1E1E] hover:shadow-[0_0_30px_rgba(0,123,255,0.15)]'} backdrop-blur border rounded-2xl flex flex-col items-center justify-center transition-all duration-300 overflow-hidden`}
                    >
                      {isSelected && selectedComponents[cat.id as ComponentCategory] ? (
                        <div className="w-full h-full p-6 flex flex-col items-center justify-center relative">
                          <button 
                            onClick={() => handleRemoveAttempt(cat.id as ComponentCategory)}
                            className="absolute top-4 right-4 p-2 bg-[#FF3B30]/10 text-[#FF3B30] hover:bg-[#FF3B30] hover:text-white rounded-full transition-colors z-10 cursor-pointer"
                          >
                            <Trash className="w-4 h-4" />
                          </button>
                          <div className="flex flex-col items-center text-center">
                            <h3 className="font-sans font-bold text-lg text-white mb-1 leading-tight max-w-[200px]">{selectedComponents[cat.id as ComponentCategory]!.nome_comercial}</h3>
                            <span className="font-mono text-sm text-[#007BFF] mb-3 font-semibold">R$ {selectedComponents[cat.id as ComponentCategory]!.preco.toLocaleString('pt-BR')}</span>
                            <button 
                              onClick={() => { setActiveSheetCategory(cat.id as ComponentCategory); setSheetOpen(true); }}
                              className="text-xs font-semibold text-white/40 hover:text-white hover:underline cursor-pointer"
                            >
                              {t('builder.actions.replace' as any)}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button 
                          className="w-full h-full p-6 flex flex-col items-center justify-center gap-4 cursor-pointer"
                          onClick={() => {
                            if (!isLocked) {
                              setActiveSheetCategory(cat.id as ComponentCategory);
                              setSheetOpen(true);
                            }
                          }}
                        >
                          <div className={`p-3 rounded-full transition-transform duration-300 ${isSelected ? 'bg-[#007BFF] text-white scale-110' : 'bg-[#007BFF]/10 text-[#007BFF] group-hover:scale-110'}`}>
                            <Icon className="w-8 h-8" />
                          </div>
                          <span className={`font-semibold text-lg transition-colors ${isSelected ? 'text-white' : 'text-white/60 group-hover:text-[#007BFF]'}`}>
                            {cat.label}
                          </span>
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </main>

          {/* AREA 2: RIGHT SIDEBAR (Architecture Topological Graph mapping) */}
          <aside className="w-[300px] shrink-0 bg-[#18181B] border-l border-white/5 flex flex-col">
            <div className="p-6 border-b border-white/5">
              <h2 className="text-sm font-mono uppercase tracking-widest text-white/40 mb-2">
                {t('builder.sidebar.title')}
              </h2>
              <div className={`inline-flex items-center px-2 py-1 rounded font-mono text-[10px] tracking-widest border transition-colors ${anchorComponent ? 'bg-[#007BFF]/10 text-[#007BFF] border-[#007BFF]/20' : 'bg-white/5 text-[#A1A1AA] border-white/10'}`}>
                {anchorComponent ? `ENGINE_LIVE // ANCHOR: ${anchorComponent}` : t('builder.badges.graphUninitialized')}
              </div>
            </div>
            
            {/* Renderização Estruturada com Linhas de Fluxo de Dependência Física */}
            <div className="flex-1 p-6 flex flex-col items-center gap-1 overflow-y-auto">
              {allCategories.map((cat, index) => {
                const selectedComp = selectedComponents[cat.id as ComponentCategory];
                
                return (
                  <React.Fragment key={cat.id}>
                    {/* Card do Nó do Grafo */}
                    <div 
                      className={`w-full py-3 px-4 border rounded-xl flex flex-col transition-all duration-300 ${
                        selectedComp 
                          ? 'border-[#007BFF]/40 bg-[#007BFF]/5 shadow-[0_0_15px_rgba(0,123,255,0.05)]' 
                          : 'border-dashed border-white/10 bg-transparent opacity-60'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className={`text-xs font-sans font-medium ${selectedComp ? 'text-white' : 'text-white/40'}`}>
                          {cat.label}
                        </span>
                        {selectedComp && (
                          <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded font-mono uppercase">
                            OK
                          </span>
                        )}
                      </div>
                      <span className={`text-[10px] font-mono mt-1 uppercase truncate tracking-wide ${selectedComp ? 'text-[#007BFF] font-semibold' : 'text-white/20'}`}>
                        {selectedComp ? selectedComp.nome_comercial : '• PENDING_INPUT'}
                      </span>
                    </div>

                    {/* Renderizador de Aresta Relacional (Edge Indicator) - Não renderiza no último elemento */}
                    {index < allCategories.length - 1 && (
                      <div className="h-4 w-0.5 bg-gradient-to-b from-white/10 to-white/5 relative my-0.5">
                        {/* Se ambas as pontas da relação crítica estiverem preenchidas, destaca a linha de fluxo */}
                        {selectedComponents[cat.id as ComponentCategory] && selectedComponents[allCategories[index+1].id as ComponentCategory] && (
                          <div className="absolute inset-0 bg-[#007BFF] animate-pulse" />
                        )}
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </aside>

        </div>

        {/* AREA 3: FIXED BOTTOM REACTIVE BAR */}
        <ReactiveMetricsBar />

        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetContent className="bg-[#121212] border-white/10 text-white w-full sm:max-w-md overflow-y-auto">
            <SheetHeader className="mb-6">
              <SheetTitle className="text-white text-xl">
                {activeSheetCategory && allCategories.find(c => c.id === activeSheetCategory)?.label || t('builder.inventory.title' as any)}
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

        <AlertDialog open={pendingTopologyAction !== null} onOpenChange={(o) => { if (!o) setPendingTopologyAction(null); }}>
          <AlertDialogContent className="bg-[#1E1E1E] border-white/10 shadow-2xl">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white text-xl">{t('builder.alerts.incompatibilityTitle' as any)}</AlertDialogTitle>
              <AlertDialogDescription className="text-white/60 text-base leading-relaxed">
                {pendingTopologyAction && (
                  <>
                    {pendingTopologyAction.type === 'REMOVE' 
                      ? t('builder.messages.msg004' as any).replace('{comp}', selectedComponents[pendingTopologyAction.targetCategory]?.nome_comercial || '').replace('{count}', pendingTopologyAction.orphanedCategories.length.toString())
                      : t('builder.messages.msg005' as any).replace('{count}', pendingTopologyAction.orphanedCategories.length.toString())
                    }
                    <div className="mt-4 p-3 bg-black/40 border border-[#FF3B30]/20 rounded-lg">
                      <span className="text-xs font-mono text-[#FF3B30] uppercase tracking-wider mb-2 block">{t('builder.alerts.affectedComponents' as any)}</span>
                      <div className="flex flex-wrap gap-2">
                        {pendingTopologyAction.orphanedCategories.map(cat => (
                          <span key={cat} className="px-2 py-1 bg-[#FF3B30]/10 text-[#FF3B30] rounded text-xs font-medium border border-[#FF3B30]/20">
                            {selectedComponents[cat]?.nome_comercial || cat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-6 border-t border-white/5 pt-4">
              <AlertDialogCancel 
                onClick={() => setPendingTopologyAction(null)}
                className="bg-transparent text-white border-white/10 hover:bg-white/5 cursor-pointer"
              >
                {t('builder.actions.cancel' as any)}
              </AlertDialogCancel>
              <AlertDialogAction 
                onClick={confirmInterception}
                className="bg-[#FF3B30] text-white hover:bg-[#FF3B30]/80 shadow-[0_0_15px_rgba(255,59,48,0.2)] hover:shadow-[0_0_25px_rgba(255,59,48,0.4)] border-transparent transition-all cursor-pointer"
              >
                {t('builder.actions.confirmPurge' as any)}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

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
