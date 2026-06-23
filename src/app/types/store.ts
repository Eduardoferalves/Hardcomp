export type ComponentCategory = 'CPU' | 'Mobo' | 'RAM' | 'GPU' | 'Storage' | 'PSU';
export type HardwareTier = '[ TIER_ENTRADA ]' | '[ TIER_BASE ]' | '[ TIER_ENTUSIASTA ]';

export interface Build_Recomendada {
  id_build_curada: string;
  nome_build: string;
  perfil_uso: string;
  hardware_tier: HardwareTier;
  preco_total: number;
  componentes: string[];
}

export interface Componente {
  id: string; // UUID
  nome_comercial: string;
  categoria: ComponentCategory;
  socket_type?: string;
  ram_standard?: string;
  tdp_maximo: number;
  preco: number;
}

export interface TopologicalIntercept {
  type: 'REMOVE' | 'SWAP';
  targetCategory: ComponentCategory;
  newComponent?: Componente; // Presente apenas no SWAP
  orphanedCategories: ComponentCategory[]; // Peças que serão invalidadas
  orphans: ComponentCategory[]; // Peças que serão invalidadas (alias)
}

export interface HardCompState {
  selectedComponents: Record<ComponentCategory, Componente | null>;
  anchorComponent: ComponentCategory | null;
  isColdStart: boolean;
  timestamp: string; // ISO 8601
  budget: number;
  was_from_recommendation: boolean;
  pendingTopologyAction: TopologicalIntercept | null;

  selectAnchor: (category: ComponentCategory) => void;
  selectComponent: (category: ComponentCategory, component: Componente) => void;
  clearBuild: () => void;
  hydrateStore: () => void;
  setBudget: (budget: number) => void;
  setWasFromRecommendation: (val: boolean) => void;
  setPendingTopologyAction: (action: TopologicalIntercept | null) => void;
  executeTopologyAction: () => void;
  confirmTopologyAction: () => void;
  loadPrebuiltSetup: (componentsMap: Record<ComponentCategory, Componente | null>, anchor: ComponentCategory, wasFromRec?: boolean) => void;
  applyChange: (
    action: { type: 'REMOVE' | 'REPLACE'; category: ComponentCategory; newComponent?: Componente },
    purgedCategories: ComponentCategory[]
  ) => void;
}
