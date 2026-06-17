import React from "react";
import { Link, useNavigate } from "react-router";
import { ChevronLeft, RefreshCcw } from "lucide-react";
import { useTranslation } from "../lib/i18n";
import { useHardCompStore } from "../store/useHardCompStore";
import { BUILDS_CURADAS, CATALOGO_HARDWARE } from "../lib/engine/mockData";
import { HardwareTier, Build_Recomendada, ComponentCategory, Componente } from "../types/store";
import { toast } from "sonner";

export function Wizard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const budget = useHardCompStore((state) => state.budget);
  const setBudget = useHardCompStore((state) => state.setBudget);
  const loadPrebuiltSetup = useHardCompStore((state) => state.loadPrebuiltSetup);

  const [activeTier, setActiveTier] = React.useState<HardwareTier>('[ TIER_BASE ]');

  const filteredBuilds = React.useMemo(() => {
    return BUILDS_CURADAS.filter(b => b.preco_total <= budget && b.hardware_tier === activeTier);
  }, [budget, activeTier]);

  const handleEject = (build: Build_Recomendada) => {
    const map: Record<ComponentCategory, Componente | null> = {
      CPU: null, Mobo: null, RAM: null, GPU: null, Storage: null, PSU: null
    };

    build.componentes.forEach(uuid => {
      const comp = CATALOGO_HARDWARE.find(c => c.id === uuid);
      if (comp) {
        map[comp.categoria] = comp;
      }
    });

    const anchor = map.CPU ? 'CPU' : 'Mobo';
    loadPrebuiltSetup(map, anchor as ComponentCategory);
    toast.success(t('wizard.messages.msg028' as any));
    navigate('/builder');
  };

  const workloads = [
    { id: 'competitive', tier: '[ TIER_ENTRADA ]' as HardwareTier, title: t('wizard.workload.competitive.title'), tierText: t('wizard.workload.competitive.tier') },
    { id: 'office', tier: '[ TIER_BASE ]' as HardwareTier, title: t('wizard.workload.office.title'), tierText: t('wizard.workload.office.tier') },
    { id: 'enthusiast', tier: '[ TIER_ENTUSIASTA ]' as HardwareTier, title: t('wizard.workload.enthusiast.title'), tierText: t('wizard.workload.enthusiast.tier') }
  ];

  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden bg-[#121212] font-sans text-white">
      
      {/* TOP HEADER */}
      <header className="flex items-center justify-between px-8 py-6 border-b border-white/5 shrink-0 bg-[#121212]">
        <div className="flex-1 flex justify-start">
          <Link 
            to="/hub" 
            className="group flex items-center gap-2 text-white/50 hover:text-white transition-colors px-3 py-2 -ml-3 rounded-lg hover:bg-white/5"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            <span className="text-sm font-medium">{t('wizard.header.returnHub')}</span>
          </Link>
        </div>
        <div className="text-sm font-medium text-white/50">
          {t('wizard.header.breadcrumb').split(' / ')[0]} <span className="mx-2 text-white/20">/</span> {t('wizard.header.breadcrumb').split(' / ')[1]}
        </div>
        <div className="flex-1"></div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-hidden px-4 flex justify-center items-center pb-8 pt-4">
        <div className="w-full max-w-4xl max-h-[calc(100vh-120px)] flex flex-col bg-[#1E1E1E] border border-white/5 shadow-2xl rounded-3xl relative overflow-hidden">
          
          <div className="px-8 pt-8 md:px-10 md:pt-10 shrink-0 mb-6">
            <h2 className="text-3xl font-bold text-white tracking-tight mb-3">
              {t('wizard.header.title')}
            </h2>
            <p className="text-white/50 text-sm leading-relaxed max-w-2xl">
              {t('wizard.header.subtitle')}
            </p>
          </div>

          <div className="flex-1 overflow-y-auto space-y-10 pb-4">
            {/* INPUT SECTION 1: FINANCIAL CONSTRAINT */}
            <div className="px-8 md:px-10">
              <div className="flex justify-between items-end mb-4">
                <label htmlFor="budget-input" className="text-base font-medium text-white/90">
                  {t('wizard.investment.label')}
                </label>
                <div className="flex items-center drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                  <span className="font-mono text-4xl font-bold text-white mr-1">R$</span>
                  <input
                    id="budget-input"
                    type="number"
                    min="0"
                    max="10000"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-32 bg-transparent text-center text-4xl font-bold font-mono text-white outline-none border-b border-white/10 focus:border-[#007BFF] transition-colors appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    style={{ MozAppearance: 'textfield' }}
                  />
                </div>
              </div>
            
              <div className="relative w-full h-3 bg-black/40 rounded-full overflow-hidden border border-white/10">
                <div 
                  className="absolute top-0 left-0 h-full bg-[#007BFF] shadow-[0_0_15px_rgba(0,123,255,0.5)] rounded-full transition-all duration-150 ease-out"
                  style={{ width: `${(budget / 10000) * 100}%` }}
                ></div>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  step="50"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
              <div className="flex justify-between text-xs font-mono text-white/30 mt-2">
                <span>R$ 0</span>
                <span>R$ 10.000+</span>
              </div>
            </div>

            {/* INPUT SECTION 2: USE-CASE MATRIX */}
            <div className="px-8 md:px-10">
              <label className="text-base font-medium text-white/90 block mb-5">
                {t('wizard.workload.label')}
              </label>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {workloads.map((wl) => {
                  const isActive = activeTier === wl.tier;
                  return (
                    <button 
                      type="button"
                      key={wl.id}
                      onClick={() => setActiveTier(wl.tier)}
                      className={`relative p-6 rounded-2xl border-2 transition-all cursor-pointer group flex flex-col justify-between text-left focus:outline-none focus:ring-2 focus:ring-[#007BFF] focus:ring-offset-2 focus:ring-offset-[#1E1E1E]
                        ${isActive 
                          ? 'border-[#007BFF] bg-[#007BFF]/5 shadow-[0_0_20px_rgba(0,123,255,0.15)]' 
                          : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20'}`}
                    >
                      <div>
                        <h3 className={`text-base font-semibold mb-1 transition-colors ${isActive ? 'text-white' : 'text-white/80 group-hover:text-white'}`}>
                          {wl.title}
                        </h3>
                      </div>
                      <div className="mt-6">
                        <span className={`inline-flex font-mono text-xs tracking-wider transition-colors ${isActive ? 'text-[#007BFF] font-medium' : 'text-white/40 group-hover:text-white/60'}`}>
                          {wl.tierText}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* RESULTS GRID */}
            <div className="px-8 md:px-10">
              {filteredBuilds.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredBuilds.map(build => (
                    <div key={build.id_build_curada} className="p-5 border border-white/10 rounded-2xl bg-white/5 flex flex-col justify-between transition-colors hover:border-[#007BFF]/30">
                      <h4 className="text-lg font-bold text-white mb-2">{build.nome_build}</h4>
                      <div className="font-mono font-bold text-xl text-[#007BFF] mb-4">
                        R$ {build.preco_total.toLocaleString('pt-BR')}
                      </div>
                      <div className="text-[11px] font-mono text-white/50 space-y-1 mb-6">
                        {['CPU', 'GPU', 'PSU'].map(cat => {
                          const uuid = build.componentes.find(id => {
                            const c = CATALOGO_HARDWARE.find(x => x.id === id);
                            return c?.categoria === cat;
                          });
                          const comp = CATALOGO_HARDWARE.find(x => x.id === uuid);
                          return comp ? <div key={comp.id}>• {cat}: {comp.nome_comercial}</div> : null;
                        })}
                      </div>
                      <button 
                        onClick={() => handleEject(build)}
                        className="mt-auto w-full px-4 py-3 bg-[#007BFF] hover:bg-[#0056b3] text-white rounded-lg text-sm font-semibold transition-colors cursor-pointer text-center"
                      >
                        {t('wizard.messages.customize' as any)}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* BOTTOM ACTION BAR */}
          <div className="px-8 pb-8 pt-6 md:px-10 md:pb-10 md:pt-6 mt-auto border-t border-white/10 shrink-0 flex flex-col md:flex-row items-center justify-between gap-6 bg-[#1E1E1E]">
            <button 
              onClick={() => {
                setBudget(850);
                setActiveTier('[ TIER_BASE ]');
              }}
              className="flex items-center gap-2 text-sm font-medium text-white/40 hover:text-white transition-colors group"
            >
              <RefreshCcw className="w-4 h-4 group-hover:-rotate-90 transition-transform duration-300" />
              {t('wizard.actions.reset')}
            </button>
            
            <div className="flex flex-col items-end gap-2 w-full md:w-auto">
              <div className={`text-[11px] font-mono tracking-wider ${filteredBuilds.length > 0 ? 'text-green-400' : 'text-[#FF3B30]'}`}>
                {filteredBuilds.length > 0 
                  ? t('wizard.messages.matchesFound' as any, { count: filteredBuilds.length })
                  : t('wizard.messages.budgetInsufficient')}
              </div>
            </div>
          </div>

        </div>
      </main>

    </div>
  );
}
