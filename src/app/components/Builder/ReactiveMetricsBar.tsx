import React from 'react';
import { useTranslation } from '../../lib/i18n';
import { useHardCompStore, useBuildMetrics } from '../../store/useHardCompStore';
import { encodeBuildToURL } from '../../lib/engine/serializer';
import { toast } from 'sonner';

export function ReactiveMetricsBar() {
  const { t } = useTranslation();
  const { totalInvestment, totalTDP, psuTargetLimit, isBuildValid, errorMessage } = useBuildMetrics();
  const isColdStart = useHardCompStore(state => state.isColdStart);
  const selectedComponents = useHardCompStore(state => state.selectedComponents);

  const isError = !isBuildValid && errorMessage;
  const isShareEnabled = isBuildValid && !isColdStart;

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
  
  // Format totalInvestment as Brazilian currency
  const formattedInvestment = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  }).format(totalInvestment);

  return (
    <div className={`absolute bottom-0 left-0 right-0 h-24 ${isError ? 'bg-[#FF3B30]/10 border-[#FF3B30]' : 'bg-[#121212] border-white/10'} border-t z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] transition-colors duration-300`}>
      <div className="h-full w-full max-w-[1400px] mx-auto px-10 flex items-center justify-between">
        
        {/* Metrics */}
        <div className={`flex items-center gap-10 divide-x ${isError ? 'divide-[#FF3B30]/20' : 'divide-white/10'}`}>
          
          <div className="pr-10">
            <p className={`text-[10px] font-mono uppercase tracking-widest ${isError ? 'text-[#FF3B30]/80' : 'text-white/40'} mb-1`}>{t('builder.footer.totalInvestment')}</p>
            <div className={`font-mono font-medium text-2xl ${isError ? 'text-[#FF3B30]' : 'text-white/80'}`}>
              {formattedInvestment}
            </div>
          </div>

          <div className="px-10">
            <p className={`text-[10px] font-mono uppercase tracking-widest ${isError ? 'text-[#FF3B30]/80' : 'text-white/40'} mb-1`}>{t('builder.footer.totalTdp')}</p>
            <div className={`font-mono font-medium text-2xl ${isError ? 'text-[#FF3B30]' : 'text-white/80'}`}>
              {totalTDP}W
            </div>
          </div>

          <div className="pl-10">
            <p className={`text-[10px] font-mono uppercase tracking-widest ${isError ? 'text-[#FF3B30]/80' : 'text-white/40'} mb-1`}>{t('builder.footer.psuLimit')}</p>
            <div className={`font-mono font-medium text-2xl ${isError ? 'text-[#FF3B30]' : 'text-white/80'}`}>
              {psuTargetLimit}W
            </div>
          </div>

        </div>

        {/* Error Message and Action Button */}
        <div className="flex items-center gap-6">
          {isError && (
            <div className="text-sm font-medium text-[#FF3B30] bg-[#FF3B30]/10 px-4 py-2 rounded-lg border border-[#FF3B30]/20">
              {t(errorMessage as any)}
            </div>
          )}
          <button 
            disabled={!isShareEnabled}
            onClick={handleShare}
            className={`px-8 py-3.5 rounded-lg text-sm font-semibold border transition-all duration-300 ${
              isShareEnabled 
                ? 'bg-[#007BFF] text-white hover:bg-[#0056b3] border-[#007BFF] shadow-[0_0_15px_rgba(0,123,255,0.3)]' 
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
