import { Componente, HardCompState, ComponentCategory } from "../../types/store";

export function checkSocket(cpu: Componente, mobo: Componente): boolean {
  if (!cpu.socket_type || !mobo.socket_type) return false;
  return cpu.socket_type === mobo.socket_type;
}

export function checkRamGeneration(mobo: Componente, ram: Componente): boolean {
  if (!mobo.ram_standard || !ram.ram_standard) return false;
  return mobo.ram_standard === ram.ram_standard;
}

export function checkPowerLimit(components: Componente[], psu: Componente | null): { valid: boolean; margin: number } {
  const totalTdp = components.reduce((acc, comp) => acc + (comp.tdp_maximo || 0), 0);
  const psuCapacity = psu?.tdp_maximo || 0;
  
  if (psuCapacity === 0) {
    return { valid: true, margin: 0 };
  }

  const limit = psuCapacity * 0.8;
  const margin = limit - totalTdp;
  
  return {
    valid: totalTdp <= limit,
    margin
  };
}

export function getCascadingPurge(
  state: HardCompState,
  action: { type: 'REMOVE' | 'REPLACE'; category: ComponentCategory; newComponent?: Componente }
): ComponentCategory[] {
  const nextComponents = { ...state.selectedComponents };
  if (action.type === 'REMOVE') {
    nextComponents[action.category] = null;
  } else if (action.type === 'REPLACE' && action.newComponent) {
    nextComponents[action.category] = action.newComponent;
  }

  let toPurge = new Set<ComponentCategory>();
  
  if (nextComponents.CPU && nextComponents.Mobo) {
    if (!checkSocket(nextComponents.CPU, nextComponents.Mobo)) {
      const purgedCat = action.category === 'CPU' ? 'Mobo' : 'CPU';
      toPurge.add(purgedCat);
      nextComponents[purgedCat] = null;
    }
  }

  if (nextComponents.Mobo && nextComponents.RAM) {
    if (!checkRamGeneration(nextComponents.Mobo, nextComponents.RAM)) {
      const purgedCat = action.category === 'Mobo' ? 'RAM' : 'Mobo';
      toPurge.add(purgedCat);
      nextComponents[purgedCat] = null;
    }
  }

  if (!nextComponents.CPU && !nextComponents.Mobo) {
    const secondaries: ComponentCategory[] = ['RAM', 'GPU', 'Storage', 'PSU'];
    secondaries.forEach(sec => {
      if (nextComponents[sec]) {
        toPurge.add(sec);
      }
    });
  }

  return Array.from(toPurge);
}
