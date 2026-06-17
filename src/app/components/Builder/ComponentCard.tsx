import React from 'react';
import { Componente } from '../../types/store';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { useTranslation } from '../../lib/i18n';

interface ComponentCardProps {
  componente: Componente;
  isInvalid?: boolean;
  motivoErro?: string;
  onSelect?: () => void;
}

export function ComponentCard({ componente, isInvalid, motivoErro, onSelect }: ComponentCardProps) {
  const { t } = useTranslation();

  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(componente.preco);

  const cardContent = (
    <div 
      className={`relative w-full rounded-2xl border p-5 flex flex-col gap-3 transition-all ${
        isInvalid 
          ? 'border-white/5 bg-[#1E1E1E]/50 opacity-40 grayscale cursor-not-allowed' 
          : 'border-white/10 bg-[#1E1E1E] hover:border-[#007BFF]/50 hover:bg-[#1E1E1E] cursor-pointer shadow-lg hover:shadow-[0_0_20px_rgba(0,123,255,0.1)]'
      }`}
      onClick={() => {
        if (!isInvalid && onSelect) onSelect();
      }}
    >
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">
            {componente.categoria}
          </span>
          <h3 className="text-lg font-bold text-white mt-1 leading-tight">
            {componente.nome_comercial}
          </h3>
        </div>
        <div className="text-right">
          <span className="font-mono text-sm font-medium text-white/80 block">
            {formattedPrice}
          </span>
          {componente.categoria === 'PSU' ? (
            <span className="font-mono text-[10px] text-white/40">{componente.tdp_maximo}W (Nominal)</span>
          ) : (
            <span className="font-mono text-[10px] text-[#007BFF]/80">{componente.tdp_maximo}W TDP</span>
          )}
        </div>
      </div>

      {(componente.socket_type || componente.ram_standard) && (
        <div className="flex items-center gap-2 mt-2">
          {componente.socket_type && (
            <span className="px-2 py-1 bg-white/5 border border-white/10 rounded font-mono text-[10px] text-white/60">
              {componente.socket_type}
            </span>
          )}
          {componente.ram_standard && (
            <span className="px-2 py-1 bg-white/5 border border-white/10 rounded font-mono text-[10px] text-white/60">
              {componente.ram_standard}
            </span>
          )}
        </div>
      )}

      {isInvalid && motivoErro && (
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#FF3B30] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg border border-red-400">
          {motivoErro}
        </div>
      )}
    </div>
  );

  if (isInvalid && motivoErro) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="w-full pb-6">{cardContent}</div>
          </TooltipTrigger>
          <TooltipContent className="bg-[#FF3B30] text-white font-medium border-red-500">
            <p>{t(motivoErro as any) || motivoErro}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return <div className="w-full pb-4">{cardContent}</div>;
}
