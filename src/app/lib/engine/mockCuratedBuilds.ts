import { ComponentCategory } from '../../types/store';

export type PerfilUso = 'GAMER' | 'OFFICE' | 'WORKSTATION';

export interface BuildRecomendada {
  id_build_curada: string;
  perfil_uso: PerfilUso;
  hardware_tier: string;
  nome_comercial: string;
  is_sponsored: boolean;
  matriz_componentes: Record<ComponentCategory, string | null>; // Guarda apenas os IDs
  preco_total_cache: number; // Preço pré-calculado (TTL do Redis)
}

// Simulando o Banco de Dados de Curadoria
export const mockCuratedBuilds: BuildRecomendada[] = [
  {
    id_build_curada: "build-entry-gamer-01",
    perfil_uso: "GAMER",
    hardware_tier: "1080P_ENTRY",
    nome_comercial: "Starter Gamer AM5",
    is_sponsored: false,
    preco_total_cache: 3400.00, // Preço somando as peças reais do mock
    matriz_componentes: {
      CPU: "f47ac10b-58cc-4372-a567-0e02b2c3d479",   // Ryzen 5 7600
      Mobo: "d47ac10b-58cc-4372-a567-0e02b2c3d477", // ASUS TUF Gaming B650-PLUS
      RAM: "b47ac10b-58cc-4372-a567-0e02b2c3d475",   // Kingston Fury 16GB DDR5
      GPU: null,
      PSU: "647ac10b-58cc-4372-a567-0e02b2c3d470",   // MSI MAG A650BN
      Storage: null
    }
  },
  {
    id_build_curada: "build-mid-gamer-02",
    perfil_uso: "GAMER",
    hardware_tier: "1440P_MID",
    nome_comercial: "Advanced Gamer Intel",
    is_sponsored: true, // Terá badge de destaque
    preco_total_cache: 4950.00, // Preço somando as peças reais do mock
    matriz_componentes: {
      CPU: "e47ac10b-58cc-4372-a567-0e02b2c3d478",   // Core i5-13400F
      Mobo: "c47ac10b-58cc-4372-a567-0e02b2c3d476", // MSI MAG B760 TOMAHAWK
      RAM: "a47ac10b-58cc-4372-a567-0e02b2c3d474",   // Corsair Vengeance 16GB DDR4
      GPU: "947ac10b-58cc-4372-a567-0e02b2c3d473",   // RTX 4060
      PSU: "647ac10b-58cc-4372-a567-0e02b2c3d470",   // MSI MAG A650BN
      Storage: null
    }
  }
];
