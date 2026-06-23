import React from "react";
import { useTranslation } from "../../lib/i18n";
import { ComponentCategory, Componente } from "../../types/store";
import { Cpu, LayoutGrid, Box, Monitor, HardDrive, Zap, Lock, Trash } from "lucide-react";

interface CategoryGridProps {
  isColdStart: boolean;
  selectedComponents: Record<ComponentCategory, Componente | null>;
  onRemoveAttempt: (catId: ComponentCategory) => void;
  onOpenInventory: (catId: ComponentCategory) => void;
}

export const CategoryGrid = React.memo(function CategoryGrid({
  isColdStart,
  selectedComponents,
  onRemoveAttempt,
  onOpenInventory
}: CategoryGridProps) {
  const { t } = useTranslation();

  const allCategories = [
    { id: "CPU", label: t('builder.categories.selectProcessor'), icon: Cpu },
    { id: "Mobo", label: t('builder.categories.selectMotherboard'), icon: LayoutGrid },
    { id: "RAM", label: t('builder.categories.memory'), icon: Box },
    { id: "GPU", label: t('builder.categories.graphics'), icon: Monitor },
    { id: "Storage", label: t('builder.categories.storage'), icon: HardDrive },
    { id: "PSU", label: t('builder.categories.powerSupply'), icon: Zap },
  ] as const;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {allCategories.map((cat) => {
        const Icon = cat.icon;
        const isAnchorCandidate = cat.id === "CPU" || cat.id === "Mobo";
        const isLocked = isColdStart && !isAnchorCandidate;
        const isSelected = selectedComponents[cat.id as ComponentCategory] !== null;

        if (isLocked) {
          return (
            <button 
              key={cat.id} 
              disabled
              aria-disabled="true"
              className="w-full relative h-48 bg-[#1E1E1E]/50 backdrop-blur border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 opacity-40 cursor-not-allowed grayscale"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 px-4 py-2 bg-[#FF3B30] rounded-full border border-[#FF3B30]/50 flex items-center gap-2 shadow-lg backdrop-blur-md">
                <Lock className="w-3.5 h-3.5 text-white" />
                <span className="text-xs font-medium text-white whitespace-nowrap">{t('builder.badges.awaitingAnchor')}</span>
              </div>

              <div className="p-3 bg-white/5 rounded-full">
                <Icon className="w-8 h-8 text-white/40" />
              </div>
              <span className="font-semibold text-lg text-white/50">
                {cat.label}
              </span>
            </button>
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
                  onClick={() => onRemoveAttempt(cat.id as ComponentCategory)}
                  className="absolute top-4 right-4 p-2 bg-[#FF3B30]/10 text-[#FF3B30] hover:bg-[#FF3B30] hover:text-white rounded-full transition-colors z-10 cursor-pointer"
                >
                  <Trash className="w-4 h-4" />
                </button>
                <div className="flex flex-col items-center text-center">
                  <h3 className="font-sans font-bold text-lg text-white mb-1 leading-tight max-w-[200px]">{selectedComponents[cat.id as ComponentCategory]!.nome_comercial}</h3>
                  <span className="font-mono text-sm text-[#007BFF] mb-3 font-semibold">R$ {selectedComponents[cat.id as ComponentCategory]!.preco.toLocaleString('pt-BR')}</span>
                  <button 
                    onClick={() => { onOpenInventory(cat.id as ComponentCategory); }}
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
                    onOpenInventory(cat.id as ComponentCategory);
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
  );
});
