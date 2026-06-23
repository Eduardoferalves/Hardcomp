import { useMemo } from "react";
import { useHardCompStore } from "../store/useHardCompStore";
import { Componente } from "../types/store";
import { checkSocket, checkRamGeneration, checkPowerLimit } from "../lib/engine/specification";

export const useBuildMetrics = () => {
  const selectedComponents = useHardCompStore((state) => state.selectedComponents);
  const budget = useHardCompStore((state) => state.budget);
  
  return useMemo(() => {
    // Componentes que efetivamente consomem energia (remove a PSU do cálculo de consumo)
    const componentsList = Object.values(selectedComponents).filter((c): c is Componente => c !== null);
    const consumersList = componentsList.filter(comp => comp.categoria !== 'PSU');
    
    const cpu = selectedComponents.CPU;
    const mobo = selectedComponents.Mobo;
    const ram = selectedComponents.RAM;
    const psu = selectedComponents.PSU;

    // Investimento soma tudo, mas o TDP acumulado ignora a capacidade nominal da PSU
    const totalInvestment = componentsList.reduce((acc, comp) => acc + comp.preco, 0);
    const totalTDP = consumersList.reduce((acc, comp) => acc + comp.tdp_maximo, 0);

    let isBuildValid = true;
    let errorMessage: string | null = null;

    // 1. Validação de Soquete (CPU ↔ Mobo)
    if (cpu && mobo && !checkSocket(cpu, mobo)) {
      isBuildValid = false;
      errorMessage = "MSG-001";
    }

    // 2. Validação de Geração de RAM (Mobo ↔ RAM)
    if (mobo && ram && !checkRamGeneration(mobo, ram)) {
      isBuildValid = false;
      errorMessage = "MSG-003";
    }

    // 3. Restrição Elétrica Zero-Trust: Passa apenas os consumidores para validação contra a PSU
    const powerCheck = checkPowerLimit(consumersList, psu);
    if (psu && !powerCheck.valid) {
      isBuildValid = false;
      errorMessage = "MSG-002";
    }

    const isOverBudget = totalInvestment > budget;

    return {
      totalInvestment,
      totalTDP,
      psuTargetLimit: psu ? psu.tdp_maximo * 0.8 : 0,
      isBuildValid,
      isOverBudget,
      budget,
      errorMessage
    };
  }, [selectedComponents, budget]);
};
