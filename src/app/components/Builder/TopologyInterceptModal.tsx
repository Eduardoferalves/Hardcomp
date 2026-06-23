import React from "react";
import { useTranslation } from "../../lib/i18n";
import { useHardCompStore } from "../../store/useHardCompStore";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "../ui/alert-dialog";

export function TopologyInterceptModal() {
  const { t } = useTranslation();
  const pendingTopologyAction = useHardCompStore((state) => state.pendingTopologyAction);
  const setPendingTopologyAction = useHardCompStore((state) => state.setPendingTopologyAction);
  const executeTopologyAction = useHardCompStore((state) => state.executeTopologyAction);
  const selectedComponents = useHardCompStore((state) => state.selectedComponents);

  const confirmInterception = () => {
    executeTopologyAction();
  };

  return (
    <AlertDialog open={pendingTopologyAction !== null} onOpenChange={(o) => { if (!o) setPendingTopologyAction(null); }}>
      <AlertDialogContent className="bg-[#1E1E1E] border-white/10 shadow-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white text-xl">{t('builder.alerts.incompatibilityTitle' as any)}</AlertDialogTitle>
          <AlertDialogDescription className="text-white/60 text-base leading-relaxed">
            {pendingTopologyAction && (
              <>
                {pendingTopologyAction.type === 'REMOVE' 
                  ? t('MSG-004', { 
                      piece: selectedComponents[pendingTopologyAction.targetCategory]?.nome_comercial || pendingTopologyAction.targetCategory, 
                      n: pendingTopologyAction.orphans.length 
                    })
                  : t('MSG-005', { 
                      piece: pendingTopologyAction.newComponent?.nome_comercial || pendingTopologyAction.targetCategory, 
                      n: pendingTopologyAction.orphans.length 
                    })
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
  );
}
