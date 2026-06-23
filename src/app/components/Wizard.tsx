import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useTranslation } from '../lib/i18n';
import { useHardCompStore } from '../store/useHardCompStore';
import { mockCuratedBuilds, BuildRecomendada, PerfilUso } from '../lib/engine/mockCuratedBuilds';
import { CATALOGO_HARDWARE } from '../lib/engine/mockData';
import { AlertTriangle, Search, Cpu, ArrowRight, ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';

type WizardState = 'COLD_INPUT' | 'PROCESSING' | 'EMPTY_STATE' | 'RESULTS_RENDERED';

export function Wizard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [fsmState, setFsmState] = useState<WizardState>('COLD_INPUT');
  
  // Inputs
  const [budget, setBudget] = useState<string>('');
  const [perfil, setPerfil] = useState<PerfilUso>('GAMER');
  
  // Output
  const [resultBuild, setResultBuild] = useState<BuildRecomendada | null>(null);

  // Ações globais do Zustand para a Rota de Fuga
  const setGlobalBudget = useHardCompStore(state => state.setBudget);

  const handleSearch = () => {
    const numBudget = Number(budget);
    if (!numBudget || numBudget < 500) {
      toast.error("Insira um valor válido de orçamento (mínimo R$ 500).");
      return;
    }

    setFsmState('PROCESSING');

    // Simulação de latência de rede/cálculo (SLA de UX)
    setTimeout(() => {
      // Motor de Matching Estático (O(N) simples sobre as curadorias, não sobre as peças)
      const matches = mockCuratedBuilds.filter(b => 
        b.perfil_uso === perfil && 
        b.preco_total_cache <= numBudget
      );

      if (matches.length === 0) {
        setFsmState('EMPTY_STATE');
      } else {
        // Pega a máquina mais próxima do teto do orçamento (Maximizar LTV)
        const bestMatch = matches.sort((a, b) => b.preco_total_cache - a.preco_total_cache)[0];
        setResultBuild(bestMatch);
        setFsmState('RESULTS_RENDERED');
      }
    }, 800);
  };

  const handleEjectToBuilder = () => {
    if (!resultBuild) return;
    
    // Injeção de Rota de Fuga (Handoff Topológico)
    setGlobalBudget(Number(budget));
    
    // Redireciona e avisa o usuário (MSG-028)
    navigate(`/builder?curated=${resultBuild.id_build_curada}`);
  };

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
        <div className="w-full max-w-2xl p-8 bg-[#1E1E1E] border border-white/5 shadow-2xl rounded-3xl relative overflow-hidden flex flex-col">
          <h2 className="text-2xl font-sans font-bold text-white mb-2">Assistente de Recomendação</h2>
          <p className="text-white/50 text-sm mb-8">Descubra a máquina ideal baseada estritamente no seu bolso.</p>

          {/* STEP 1: COLD INPUT */}
          {(fsmState === 'COLD_INPUT' || fsmState === 'EMPTY_STATE') && (
            <div className="space-y-6 animate-in fade-in zoom-in duration-300">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono text-white/40 uppercase tracking-widest">Orçamento Máximo (R$)</label>
                <input 
                  type="number" 
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="Ex: 4500"
                  className="bg-[#121212] border border-white/10 p-4 rounded-lg text-white font-mono text-xl focus:border-[#007BFF] focus:outline-none transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono text-white/40 uppercase tracking-widest">Perfil de Uso</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['GAMER', 'OFFICE', 'WORKSTATION'] as PerfilUso[]).map((p) => {
                    const isActive = perfil === p;
                    return (
                      <button
                        type="button"
                        key={p}
                        onClick={() => setPerfil(p)}
                        className={`p-3 rounded-lg border text-sm font-semibold transition-all cursor-pointer ${
                          isActive
                            ? 'border-[#007BFF] bg-[#007BFF]/10 text-white shadow-[0_0_10px_rgba(0,123,255,0.1)]'
                            : 'border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        {p}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button 
                onClick={handleSearch}
                disabled={Number(budget) < 500}
                className="w-full py-4 bg-[#007BFF] hover:bg-[#0056b3] disabled:opacity-50 disabled:hover:bg-[#007BFF] text-white rounded-lg font-bold transition-all flex justify-center items-center gap-2 cursor-pointer"
              >
                <Search className="w-5 h-5" /> Buscar Configuração
              </button>

              {/* STEP 2: EMPTY STATE (Poka-Yoke) */}
              {fsmState === 'EMPTY_STATE' && (
                <div className="mt-4 p-4 border border-[#FF3B30]/20 bg-[#FF3B30]/10 rounded-lg flex gap-3 items-start">
                  <AlertTriangle className="w-5 h-5 text-[#FF3B30] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-[#FF3B30] font-bold text-sm">Orçamento Insuficiente</h4>
                    <p className="text-[#FF3B30]/80 text-xs mt-1 font-mono">{t('MSG-023')}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: PROCESSING */}
          {fsmState === 'PROCESSING' && (
            <div className="py-20 flex flex-col items-center justify-center space-y-4 animate-in fade-in">
              <Cpu className="w-10 h-10 text-[#007BFF] animate-pulse" />
              <p className="text-white/60 font-mono text-xs tracking-widest uppercase">Varrendo Catálogo Curado...</p>
            </div>
          )}

          {/* STEP 4: RESULTS RENDERED */}
          {fsmState === 'RESULTS_RENDERED' && resultBuild && (
            <div className="space-y-6 animate-in slide-in-from-bottom-4 fade-in duration-500">
              <div className="p-5 border border-emerald-500/20 bg-emerald-500/5 rounded-xl">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    {resultBuild.is_sponsored && <span className="text-[10px] bg-amber-500/20 text-amber-500 px-2 py-1 rounded font-bold uppercase tracking-wider mb-2 inline-block">Patrocinado</span>}
                    <h3 className="text-xl font-bold text-white">{resultBuild.nome_comercial}</h3>
                    <p className="text-emerald-400 font-mono text-sm mt-1">Garante compatibilidade total.</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-mono font-bold text-white">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(resultBuild.preco_total_cache)}
                    </p>
                  </div>
                </div>

                {/* Read-Only Specs Preview */}
                <div className="grid grid-cols-2 gap-2 mt-6">
                  {Object.entries(resultBuild.matriz_componentes).map(([cat, id]) => {
                    if (!id) return null;
                    const comp = CATALOGO_HARDWARE.find(c => c.id === id);
                    return (
                      <div key={cat} className="p-2 bg-[#121212] rounded border border-white/5 flex flex-col">
                        <span className="text-[9px] font-mono text-white/40 uppercase">{cat}</span>
                        <span className="text-xs text-white truncate">{comp?.nome_comercial || 'Indisponível'}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => setFsmState('COLD_INPUT')}
                  className="px-6 py-3 border border-white/10 text-white/70 hover:text-white hover:bg-white/5 rounded-lg text-sm font-semibold transition-colors cursor-pointer"
                >
                  Refazer Busca
                </button>
                <button 
                  onClick={handleEjectToBuilder}
                  className="flex-1 py-3 bg-[#007BFF] hover:bg-[#0056b3] text-white rounded-lg text-sm font-bold transition-all flex justify-center items-center gap-2 cursor-pointer"
                >
                  Personalizar no Montador <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
