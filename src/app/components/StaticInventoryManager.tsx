import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router";
import { ChevronLeft, Trash2, Search, Info, LayoutGrid, Cpu, Box, Monitor, HardDrive, Zap, X } from "lucide-react";
import { useTranslation } from "../lib/i18n";
import { useHardCompStore } from "../store/useHardCompStore";
import { CATALOGO_HARDWARE } from "../lib/engine/mockData";
import { Componente, ComponentCategory } from "../types/store";

const CATEGORY_ICONS: Record<ComponentCategory, React.ElementType> = {
  Mobo: LayoutGrid, CPU: Cpu, RAM: Box, GPU: Monitor, Storage: HardDrive, PSU: Zap
};

export function StaticInventoryManager() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  // Ações atômicas do Zustand
  const selectedComponents = useHardCompStore(state => state.selectedComponents);
  const setComponent = useHardCompStore(state => state.selectComponent);
  const applyChange = useHardCompStore(state => state.applyChange);

  const removeComponent = (category: ComponentCategory) => {
    applyChange({ type: 'REMOVE', category }, []);
  };

  // Estados Locais de UI (Modo de Edição)
  const [activeSearchCategory, setActiveSearchCategory] = useState<ComponentCategory | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Motor de Busca Simples (Filtra o CATALOGO_HARDWARE baseado na categoria ativa e na string digitada)
  const searchResults = useMemo(() => {
    if (!activeSearchCategory || searchQuery.trim().length < 2) return [];
    
    return CATALOGO_HARDWARE.filter(comp => 
      comp.categoria === activeSearchCategory && 
      comp.nome_comercial.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [activeSearchCategory, searchQuery]);

  // Cálculos do Painel Topológico
  const activeNodesCount = Object.values(selectedComponents).filter(c => c !== null).length;
  const totalStaticTDP = Object.values(selectedComponents)
    .filter((c): c is Componente => c !== null && c.categoria !== 'PSU')
    .reduce((acc, curr) => acc + curr.tdp_maximo, 0);

  const baseArch = selectedComponents.Mobo?.socket_type || selectedComponents.CPU?.socket_type || 'Nenhuma (Selecione Mobo/CPU)';

  // Handlers
  const handleLockAndProceed = () => {
    // Ao trancar o inventário estático, o usuário é ejetado para o construtor principal
    // para finalizar a montagem com Poka-Yoke ativado.
    const anchor = selectedComponents.CPU ? 'CPU' : (selectedComponents.Mobo ? 'Mobo' : null);
    if (anchor) {
      useHardCompStore.setState({
        isColdStart: false,
        anchorComponent: anchor
      });
    } else {
      useHardCompStore.setState({
        isColdStart: true,
        anchorComponent: null
      });
    }
    navigate('/builder');
  };

  return (
    <div className="w-screen h-screen bg-[#121212] text-white font-sans flex flex-col overflow-hidden relative">
      
      {/* HEADER */}
      <header className="px-10 py-8 border-b border-white/5 shrink-0 bg-[#121212]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-4">
          <Link 
            to="/hub" 
            className="group flex items-center gap-2 text-white/50 hover:text-white hover:bg-white/5 px-3 py-2 rounded-lg transition-colors shrink-0"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            <span className="text-sm font-medium font-sans">{t('inventory.returnHub')}</span>
          </Link>
          <div>
            <h2 className="text-3xl font-bold text-white tracking-tight mb-2 font-sans">
              {t('inventory.header.title')}
            </h2>
            <p className="text-white/50 text-sm max-w-3xl leading-relaxed">
              {t('inventory.header.subtitleStart')}<span className="font-mono text-white/70">{t('inventory.header.staticNodeLabel')}</span>{t('inventory.header.subtitleEnd')}
            </p>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-hidden h-[calc(100vh-140px)]">
        <div className="max-w-7xl w-full mx-auto flex flex-col md:flex-row items-start gap-8 h-full">
          
          {/* COLUMN 1: THE INVENTORY BUILDER */}
          <div className="flex-1 flex flex-col overflow-y-auto pb-20 pr-4 w-full gap-4 pt-10 pl-10 md:pl-0">
            
            {(['Mobo', 'CPU', 'RAM', 'GPU', 'Storage', 'PSU'] as ComponentCategory[]).map(category => {
              const comp = selectedComponents[category];
              const isSearching = activeSearchCategory === category;
              const Icon = CATEGORY_ICONS[category];

              // ESTADO 1: Slot Preenchido (A Peça que o usuário informou que já possui)
              if (comp && !isSearching) {
                return (
                  <div key={category} className="group relative bg-[#1E1E1E]/80 backdrop-blur rounded-2xl border border-emerald-500/30 p-5 flex items-center gap-5 shadow-lg">
                    <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500 shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-mono text-white/40 mb-1">{category}</div>
                      <div className="text-lg font-semibold text-white truncate">{comp.nome_comercial}</div>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0 px-4 border-r border-white/10">
                      <span className="inline-flex items-center px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[10px] tracking-wider border border-emerald-500/20">
                        {t('inventory.badges.staticNode')}
                      </span>
                    </div>
                    {/* Botões de Ação: Editar (Abre a busca) ou Remover */}
                    <button 
                      onClick={() => { setActiveSearchCategory(category); setSearchQuery(''); }}
                      className="p-2 text-white/40 hover:text-[#007BFF] hover:bg-[#007BFF]/10 rounded-lg transition-colors ml-2 cursor-pointer"
                    >
                      <Search className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => removeComponent(category)}
                      className="p-2 text-white/40 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                );
              }

              // ESTADO 2: Slot em Modo de Busca Ativa
              if (isSearching) {
                return (
                  <div key={category} className="relative bg-[#1E1E1E] rounded-2xl border border-[#007BFF]/50 p-5 shadow-[0_0_20px_rgba(0,123,255,0.15)] flex flex-col gap-4">
                    <div className="flex items-center gap-4 w-full">
                      <div className="p-3 bg-[#007BFF]/10 rounded-xl text-[#007BFF] shrink-0">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Search className="h-5 w-5 text-[#007BFF]/50" />
                        </div>
                        <input 
                          type="text" 
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="block w-full bg-black/50 border border-[#007BFF]/30 rounded-lg py-3 pl-10 pr-10 text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#007BFF] font-sans text-sm"
                          placeholder={`Buscar modelo de ${category}...`}
                          autoFocus
                        />
                        <button 
                          onClick={() => setActiveSearchCategory(null)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/50 hover:text-white cursor-pointer"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Dropdown de Resultados Dinâmico */}
                    {searchResults.length > 0 && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-[#18181B] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-20 mx-5">
                        <div className="max-h-48 overflow-y-auto p-1 flex flex-col gap-1">
                          {searchResults.map(result => (
                            <button 
                              key={result.id}
                              onClick={() => {
                                setComponent(category, result);
                                setActiveSearchCategory(null);
                                setSearchQuery("");
                              }}
                              className="flex items-center justify-between p-3 hover:bg-white/5 rounded-lg text-left transition-colors w-full group cursor-pointer"
                            >
                              <div>
                                <div className="text-sm font-semibold text-white group-hover:text-[#007BFF] transition-colors">{result.nome_comercial}</div>
                              </div>
                              <span className="text-xs font-medium text-white/40 bg-white/5 px-2 py-1 rounded">{t('inventory.actions.select')}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    {searchQuery.length >= 2 && searchResults.length === 0 && (
                      <div className="text-xs text-white/40 text-center py-2">Nenhuma peça encontrada no catálogo.</div>
                    )}
                  </div>
                );
              }

              // ESTADO 3: Slot Vazio
              return (
                <button 
                  key={category}
                  onClick={() => { setActiveSearchCategory(category); setSearchQuery(''); }}
                  className="group w-full py-6 px-5 rounded-2xl border border-dashed border-white/20 bg-transparent hover:bg-white/5 hover:border-white/40 transition-colors flex items-center gap-5 cursor-pointer"
                >
                  <div className="p-3 bg-white/5 rounded-xl text-white/40 group-hover:text-white/70 transition-colors shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-mono text-white/40 mb-1 group-hover:text-white/60 transition-colors">{category}</div>
                    <div className="text-sm font-medium text-white/50 group-hover:text-white transition-colors">
                      Adicionar {category} existente
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* COLUMN 2: TOPOLOGICAL IMPACT PANEL */}
          <div className="w-full md:w-[320px] shrink-0 p-10 pl-0 md:pt-10">
            <div className="h-fit max-h-[calc(100vh-160px)] flex flex-col bg-[#18181B] rounded-2xl p-6 border border-white/5 shadow-2xl">
              
              <h3 className="text-lg font-semibold text-white font-sans shrink-0 mb-6">
                {t('inventory.panel.title')}
              </h3>
              
              <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-sans text-white/40 uppercase tracking-wider">{t('inventory.panel.nodesDeclared')}</span>
                  <span className="font-mono text-xl text-white">{activeNodesCount}/6</span>
                </div>
                
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-sans text-white/40 uppercase tracking-wider">{t('inventory.panel.staticTdp')}</span>
                  <span className="font-mono text-xl text-yellow-400">{totalStaticTDP}W</span>
                </div>
                
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-sans text-white/40 uppercase tracking-wider">{t('inventory.panel.baseArch')}</span>
                  <span className="font-mono text-xl text-emerald-400 truncate">{baseArch}</span>
                </div>

                <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-4 flex gap-3 mt-6">
                  <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-200/80 leading-relaxed font-sans">
                    {t('inventory.panel.infoText')}
                  </p>
                </div>
              </div>

              <div className="shrink-0 pt-6 mt-auto border-t border-white/5">
                <button 
                  onClick={handleLockAndProceed}
                  disabled={activeNodesCount === 0}
                  className="w-full bg-[#007BFF] hover:bg-[#0056b3] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3.5 px-4 rounded-xl transition-colors shadow-[0_0_15px_rgba(0,123,255,0.3)] hover:shadow-[0_0_25px_rgba(0,123,255,0.5)] cursor-pointer"
                >
                  {t('inventory.panel.lockBtn')}
                </button>
              </div>

            </div>
          </div>

        </div>
      </main>

    </div>
  );
}
