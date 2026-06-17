import { Componente, Build_Recomendada } from "../../types/store";

export const CATALOGO_HARDWARE: readonly Componente[] = [
  {
    id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    nome_comercial: "Ryzen 5 7600",
    categoria: "CPU",
    socket_type: "AM5",
    ram_standard: "DDR5",
    tdp_maximo: 65,
    preco: 1200
  },
  {
    id: "e47ac10b-58cc-4372-a567-0e02b2c3d478",
    nome_comercial: "Core i5-13400F",
    categoria: "CPU",
    socket_type: "LGA1700",
    ram_standard: "DDR4",
    tdp_maximo: 65,
    preco: 1100
  },
  {
    id: "d47ac10b-58cc-4372-a567-0e02b2c3d477",
    nome_comercial: "ASUS TUF Gaming B650-PLUS",
    categoria: "Mobo",
    socket_type: "AM5",
    ram_standard: "DDR5",
    tdp_maximo: 0,
    preco: 1400
  },
  {
    id: "c47ac10b-58cc-4372-a567-0e02b2c3d476",
    nome_comercial: "MSI MAG B760 TOMAHAWK",
    categoria: "Mobo",
    socket_type: "LGA1700",
    ram_standard: "DDR4",
    tdp_maximo: 0,
    preco: 1300
  },
  {
    id: "b47ac10b-58cc-4372-a567-0e02b2c3d475",
    nome_comercial: "Kingston Fury 16GB DDR5",
    categoria: "RAM",
    ram_standard: "DDR5",
    tdp_maximo: 5,
    preco: 450
  },
  {
    id: "a47ac10b-58cc-4372-a567-0e02b2c3d474",
    nome_comercial: "Corsair Vengeance 16GB DDR4",
    categoria: "RAM",
    ram_standard: "DDR4",
    tdp_maximo: 5,
    preco: 300
  },
  {
    id: "947ac10b-58cc-4372-a567-0e02b2c3d473",
    nome_comercial: "RTX 4060",
    categoria: "GPU",
    tdp_maximo: 115,
    preco: 1900
  },
  {
    id: "847ac10b-58cc-4372-a567-0e02b2c3d472",
    nome_comercial: "RX 7700 XT",
    categoria: "GPU",
    tdp_maximo: 245,
    preco: 2900
  },
  {
    id: "747ac10b-58cc-4372-a567-0e02b2c3d471",
    nome_comercial: "Corsair RM750e",
    categoria: "PSU",
    tdp_maximo: 750,
    preco: 650
  },
  {
    id: "647ac10b-58cc-4372-a567-0e02b2c3d470",
    nome_comercial: "MSI MAG A650BN",
    categoria: "PSU",
    tdp_maximo: 650,
    preco: 350
  }
] as const;

export const BUILDS_CURADAS: readonly Build_Recomendada[] = [
  {
    id_build_curada: "b1",
    nome_build: "Setup Challenger AMD",
    perfil_uso: "Jogos AAA em 4K e Renderização",
    hardware_tier: "[ TIER_ENTUSIASTA ]",
    preco_total: 6600,
    componentes: [
      "f47ac10b-58cc-4372-a567-0e02b2c3d479",
      "d47ac10b-58cc-4372-a567-0e02b2c3d477",
      "b47ac10b-58cc-4372-a567-0e02b2c3d475",
      "847ac10b-58cc-4372-a567-0e02b2c3d472",
      "747ac10b-58cc-4372-a567-0e02b2c3d471"
    ]
  },
  {
    id_build_curada: "b2",
    nome_build: "Intel Pro Workstation",
    perfil_uso: "Escritório e Produtividade",
    hardware_tier: "[ TIER_BASE ]",
    preco_total: 4950,
    componentes: [
      "e47ac10b-58cc-4372-a567-0e02b2c3d478",
      "c47ac10b-58cc-4372-a567-0e02b2c3d476",
      "a47ac10b-58cc-4372-a567-0e02b2c3d474",
      "947ac10b-58cc-4372-a567-0e02b2c3d473",
      "647ac10b-58cc-4372-a567-0e02b2c3d470"
    ]
  }
] as const;
