import React from 'react';
import { useTranslation } from '../../lib/i18n';
import { useHardCompStore, useBuildMetrics } from '../../store/useHardCompStore';
import { encodeBuildToURL } from '../../lib/engine/serializer';
import { toast } from 'sonner';
import { AlertTriangle, DollarSign, Zap } from 'lucide-react';

export function ReactiveMetricsBar() {
  const { t } = useTranslation();
  const { 
    totalInvestment, 
    totalTDP, 
    psuTargetLimit, 
    isBuildValid, 
    isOverBudget, 
    budget, 
    errorMessage 
  } = useBuildMetrics();
  
  const isColdStart = useHardCompStore(state => state.isColdStart);
  const selectedComponents = useHardCompStore(state => state.selectedComponents);
  const setBudget = useHardCompStore(state => state.setBudget);

  const isError = (!isBuildValid && errorMessage) || isOverBudget;
  const isShareEnabled = isBuildValid && !isColdStart && !isOverBudget;

  // Cálculo da porcentagem de consumo frente ao limite de 80% da PSU
  const tdpPercentage = psuTargetLimit > 0 ? Math.min((totalTDP / psuTargetLimit) * 100, 100) : 0;
  
  // Cor semântica dinâmica da barra de progresso (Design System Strict Rule)
  const progressBarColor = totalTDP > psuTargetLimit 
    ? 'bg-[#FF3B30]' 
    : tdpPercentage > 85 
      ? 'bg-amber-500' 
      : 'bg-emerald-500';

  const handleShare = () => {
    const ids = Object.values(selectedComponents)
      .filter(comp => comp !== null)
      .map(comp => comp!.id);
    
    if (ids.length === 0) return;

    const encoded = encodeBuildToURL(ids);
    const shareUrl = `${window.location.origin}/builder?build=${encoded}`;
    
    navigator.clipboard.writeText(shareUrl).then(() => {
      toast.success(t('builder.messages.shareSuccess' as any));
    }).catch(() => {
      console.error("Failed to copy");
    });
  };

  return (
    <div className={`absolute bottom-0 left-0 right-0 h-24 ${isError ? 'bg-[#FF3B30]/5 border-[#FF3B30]/30' : 'bg-[#121212] border-white/10'} border-t z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.7)] transition-colors duration-300`}>
      <div className="h-full w-full max-w-[1400px] mx-auto px-10 flex items-center justify-between">
        
        {/* Seção 1: Métricas de Hardware e Finanças */}
        <div className="flex items-center gap-10 divide-x divide-white/5">
          
          {/* Métrica Financeira + Controle de Orçamento Inline */}
          <div className="flex flex-col pr-2">
            <p className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-1 flex items-center gap-1">
              <DollarSign className="w-3 h-3" /> {t('builder.footer.totalInvestment')}
            </p>
            <div className="flex items-baseline gap-2">
              <span className={`font-mono font-bold text-2xl ${isOverBudget ? 'text-[#FF3B30]' : 'text-white'}`}>
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalInvestment)}
              </span>
              <span className="text-xs font-mono text-white/30">
                / Limit: 
                <input 
                  type="number" 
                  value={budget} 
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="bg-transparent border-b border-white/10 hover:border-white/30 focus:border-[#007BFF] focus:outline-none w-16 ml-1 text-center text-white/60 font-mono"
                />
              </span>
            </div>
          </div>

          {/* Métrica Elétrica Reativa com Barra de Progresso Poka-Yoke */}
          <div className="px-10 flex flex-col justify-center min-w-[280px]">
            <div className="flex justify-between items-center mb-1">
              <p className="text-[10px] font-mono uppercase tracking-widest text-white/40 flex items-center gap-1">
                <Zap className="w-3 h-3" /> {t('builder.footer.totalTdp')}
              </p>
              <span className="text-[10px] font-mono text-white/50">{totalTDP}W / {psuTargetLimit.toFixed(0)}W (80% Limit)</span>
            </div>
            
            {/* Container da Barra de Progresso */}
            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/5 relative">
              <div 
                className={`h-full ${progressBarColor} transition-all duration-500 ease-out`}
                style={{ width: `${psuTargetLimit > 0 ? tdpPercentage : 0}%` }}
              />
            </div>
          </div>

        </div>

        {/* Seção 2: Mensagens de Erro Unificadas e Ação de Ejeção/Compartilhamento */}
        <div className="flex items-center gap-6">
          {isOverBudget && (
            <div className="text-xs font-mono flex items-center gap-2 text-[#FF3B30] bg-[#FF3B30]/10 px-4 py-2 rounded-lg border border-[#FF3B30]/20 animate-pulse">
              <AlertTriangle className="w-4 h-4" />
              ORÇAMENTO EXCEDIDO
            </div>
          )}
          
          {!isBuildValid && errorMessage && (
            <div className="text-xs font-mono text-[#FF3B30] bg-[#FF3B30]/10 px-4 py-2 rounded-lg border border-[#FF3B30]/20">
              {t(errorMessage as any)}
            </div>
          )}

          <button 
            disabled={!isShareEnabled}
            onClick={handleShare}
            className={`px-8 py-3.5 rounded-lg text-sm font-semibold border font-sans transition-all duration-300 ${
              isShareEnabled 
                ? 'bg-[#007BFF] text-white hover:bg-[#0056b3] border-[#007BFF] shadow-[0_0_15px_rgba(0,123,255,0.3)] cursor-pointer' 
                : 'bg-gray-800 text-white/40 opacity-50 cursor-not-allowed border-white/5'
            }`}
          >
            {t('builder.actions.share' as any)}
          </button>
        </div>

      </div>
    </div>
  );
}
