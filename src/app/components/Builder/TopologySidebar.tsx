import React from "react";
import { useTranslation } from "../../lib/i18n";
import { ComponentCategory, Componente } from "../../types/store";

interface TopologySidebarProps {
  selectedComponents: Record<ComponentCategory, Componente | null>;
  anchorComponent: ComponentCategory | null;
}

const CATEGORIES: ComponentCategory[] = ["CPU", "Mobo", "RAM", "GPU", "Storage", "PSU"];

export function TopologySidebar({ selectedComponents, anchorComponent }: TopologySidebarProps) {
  const { t } = useTranslation();

  const labels: Record<ComponentCategory, string> = {
    CPU: t('builder.categories.selectProcessor'),
    Mobo: t('builder.categories.selectMotherboard'),
    RAM: t('builder.categories.memory'),
    GPU: t('builder.categories.graphics'),
    Storage: t('builder.categories.storage'),
    PSU: t('builder.categories.powerSupply')
  };

  return (
    <aside className="w-[300px] shrink-0 bg-[#18181B] border-l border-white/5 flex flex-col">
      <div className="p-6 border-b border-white/5">
        <h2 className="text-sm font-mono uppercase tracking-widest text-white/40 mb-2">
          {t('builder.sidebar.title')}
        </h2>
        <div className={`inline-flex items-center px-2 py-1 rounded font-mono text-[10px] tracking-widest border transition-colors ${anchorComponent ? 'bg-[#007BFF]/10 text-[#007BFF] border-[#007BFF]/20' : 'bg-white/5 text-[#A1A1AA] border-white/10'}`}>
          {anchorComponent ? `ENGINE_LIVE // ANCHOR: ${anchorComponent}` : t('builder.badges.graphUninitialized')}
        </div>
      </div>
      
      <div className="flex-1 p-6 flex flex-col items-center gap-1 overflow-y-auto">
        {CATEGORIES.map((catId, index) => {
          const selectedComp = selectedComponents[catId];
          const label = labels[catId];
          
          return (
            <React.Fragment key={catId}>
              <div 
                className={`w-full py-3 px-4 border rounded-xl flex flex-col transition-all duration-300 ${
                  selectedComp 
                    ? 'border-[#007BFF]/40 bg-[#007BFF]/5 shadow-[0_0_15px_rgba(0,123,255,0.05)]' 
                    : 'border-dashed border-white/10 bg-transparent opacity-60'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className={`text-xs font-sans font-medium ${selectedComp ? 'text-white' : 'text-white/40'}`}>
                    {label}
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

              {index < CATEGORIES.length - 1 && (
                <div className="h-4 w-0.5 bg-gradient-to-b from-white/10 to-white/5 relative my-0.5">
                  {selectedComponents[catId] && selectedComponents[CATEGORIES[index+1]] && (
                    <div className="absolute inset-0 bg-[#007BFF] animate-pulse" />
                  )}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </aside>
  );
}
