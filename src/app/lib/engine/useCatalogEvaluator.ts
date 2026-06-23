import { useMemo } from 'react';
import { Componente, ComponentCategory } from '../../types/store';
import { checkSocket, checkRamGeneration } from './specification';

export const useCatalogEvaluator = (
  catalogItems: Componente[],
  selectedComponents: Record<ComponentCategory, Componente | null>,
  anchorComponent: ComponentCategory | null
) => {
  return useMemo(() => {
    return catalogItems.map(item => {
      let isInvalid = false;
      let conflictReason: string | null = null;

      // Se o processador for trocado e a Mobo for a âncora, bloqueia soquetes incompatíveis.
      // Se o processador for a âncora, a troca é liberada (e disparará o alerta de expurgo na Mobo).
      if (item.categoria === 'CPU' && selectedComponents.Mobo && anchorComponent !== 'CPU') {
        if (!checkSocket(item, selectedComponents.Mobo)) {
          isInvalid = true;
          conflictReason = 'MSG-001';
        }
      }

      // Se a Mobo for trocada e a CPU for a âncora, bloqueia placas de soquetes incompatíveis.
      if (item.categoria === 'Mobo') {
        if (selectedComponents.CPU && anchorComponent !== 'Mobo' && !checkSocket(selectedComponents.CPU, item)) {
          isInvalid = true;
          conflictReason = 'MSG-001';
        }
        if (selectedComponents.RAM && !checkRamGeneration(item, selectedComponents.RAM)) {
          isInvalid = true;
          conflictReason = 'MSG-003';
        }
      }

      // Memória RAM deve sempre ser compatível com a Placa-Mãe instalada.
      if (item.categoria === 'RAM' && selectedComponents.Mobo) {
        if (!checkRamGeneration(selectedComponents.Mobo, item)) {
          isInvalid = true;
          conflictReason = 'MSG-003';
        }
      }

      return { component: item, isInvalid, conflictReason };
    });
  }, [catalogItems, selectedComponents, anchorComponent]);
};
