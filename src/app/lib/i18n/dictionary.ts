export const dictionary = {
  "MSG-001": "MSG-001: Incompatibilidade de Socket (Processador/Placa-Mãe).",
  "MSG-002": "MSG-002: TDP excede 80% da capacidade da Fonte de Alimentação.",
  "MSG-003": "MSG-003: Incompatibilidade de Geração de Memória RAM.",
  "MSG-023": "MSG-023: Todas builds violam orçamento",
  "MSG-028": "MSG-028: Personalização carregada. Você pode alterar peças à vontade.",
  "MSG-039": "MSG-039: Eviction Policy Triggered. Store payload expired.",
  landing: {
    hero: {
      status: "SYS_STATUS: MOTOR_DETERMINISTICO_ATIVO",
      title1: "Não compre apenas hardware.",
      title2: "Compre a certeza matemática de que funciona.",
      subtitle: "O primeiro construtor de PC Zero-Trust. Bloqueamos incompatibilidades físicas e elétricas antes mesmo do seu clique.",
      cta: "Entrar no Hub do Construtor",
      ctaWizard: "Preciso de Recomendação (Assistente Guiado)",
      ctaManual: "Montar do Zero (Painel Avançado)"
    },
    features: {
      title: "A Matemática da Compatibilidade",
      subtitle: "ARQUITETURA_SISTEMA // TRUST_NO_ONE",
      feature1: {
        title: "Garantia de 100% de Compatibilidade",
        description: "Motor de validação determinístico."
      },
      feature2: {
        title: "Rastreamento de Preços em Tempo Real",
        description: "Inteligência de mercado algorítmica (Cache Redis atualizado a cada hora)."
      },
      feature3: {
        title: "Interface Poka-Yoke",
        description: "Erros prevenidos por design."
      }
    }
  },
  hub: {
    title: "Inicializar Ambiente de Construção",
    subtitle: "Selecione seu vetor de implantação. O motor determinístico adaptará suas restrições com base nos parâmetros iniciais.",
    cards: {
      coldStart: {
        title: "Inicialização a Frio",
        badge: "(Construção do Zero)",
        description: "Selecione um Componente Âncora (CPU ou Placa-Mãe) e deixe o motor restringir peças incompatíveis. Validação total em modo estrito.",
        status: "MOTOR_PRONTO: 0 RESTRICOES"
      },
      upgrade: {
        title: "Atualizar Setup",
        badge: "(Retrofit)",
        description: "Insira as peças que você já possui (marcadas como 'Estáticas'). O motor descobrirá atualizações matematicamente seguras para os slots restantes.",
        status: "AGUARDANDO_ENTRADAS_ESTATICAS"
      },
      wizard: {
        title: "Assistente Guiado",
        badge: "(Piloto Automático)",
        description: "Selecione seu orçamento e caso de uso (Jogos, Workstation, Nó de Renderização), e receba uma construção curada globalmente otimizada.",
        status: "ALGORITMO_EM_ESPERA"
      }
    },
    sidebar: {
      title: "HardComp",
      newConfig: "Nova Configuração",
      continueBuild: "Continuar Construção Anterior",
      guidedWizard: "Assistente Inteligente Guiado",
      syncMsg: "O progresso da sua montagem é salvo localmente por 7 dias.",
      syncBtn: "Criar Conta / Sincronizar",
      syncHover: "Sincronizar Progresso",
      anonymous: "Anônimo",
      toggle: "Alternar Menu Lateral",
      settings: "Configurações"
    },
    workspace: {
      breadcrumb: "Workspace / Inicialização",
      title: "Como você deseja começar?",
      subtitle: "Selecione seu caminho de engenharia. O motor determinístico opera totalmente no lado do cliente, sem necessidade de conta obrigatória.",
      cards: {
        scratch: {
          badge: "[ FRAMEWORK: HU-001 ]",
          title: "Montagem do Zero",
          description: "Comece do zero. A plataforma força a seleção de um Componente Âncora (CPU ou Placa-Mãe) para travar a topologia do sistema antes de executar restrições reativas.",
          button: "Inicializar Montagem Vazia"
        },
        upgrade: {
          badge: "[ METRICA: ISOLAMENTO_ESTATICO ]",
          title: "Atualização de Sistema",
          description: "Insira os componentes que você já possui. O motor de validação os sinaliza como nós estáticos somente leitura, isolando-os estritamente do preço final, ao mesmo tempo que os contabiliza nos limites de TDP e soquete.",
          button: "Declarar Hardware Existente"
        },
        wizard: {
          badge: "[ CURADORIA: MATRIZ_FIXA ]",
          title: "Recomendação Direcionada",
          description: "Para usuários em busca de otimização automatizada. Declare seu limite preciso de orçamento e caso de uso (ex: Jogos Competitivos 1080p, Workstation 3D) para carregar instantaneamente um setup de hardware pré-validado.",
          button: "Iniciar Assistente"
        }
      }
    }
  },
  inventory: {
    returnHub: "Voltar ao Hub",
    header: {
      title: "Declaração de Inventário Estático",
      subtitleStart: "Insira seu hardware existente. O motor de validação bloqueará estes itens como componentes somente leitura ",
      staticNodeLabel: "[NÓS_ESTÁTICOS]",
      subtitleEnd: ", fatorando-os nas restrições de energia/soquete enquanto os exclui do cálculo final do carrinho."
    },
    items: {
      motherboard: "Placa-Mãe",
      processor: "Processador",
      memory: "Memória",
      graphics: "Placa de Vídeo",
      storage: "Armazenamento",
      powerSupply: "Fonte de Alimentação"
    },
    badges: {
      staticNode: "[NÓ_ESTÁTICO]",
      ownedValue: "$0.00 (Possuído)"
    },
    actions: {
      select: "Selecionar"
    },
    search: {
      placeholder: "Pesquisando: Corsair Vengeance..."
    },
    emptyState: {
      graphics: "Clique para adicionar uma Placa de Vídeo existente...",
      storage: "Clique para adicionar um Armazenamento existente...",
      powerSupply: "Clique para adicionar uma Fonte de Alimentação existente..."
    },
    panel: {
      title: "Status do Motor de Inventário",
      nodesDeclared: "Nós Declarados",
      staticTdp: "TDP Estático Reservado",
      baseArch: "Arquitetura Base Travada",
      infoText: "A precificação está desativada para componentes declarados. O motor calculará custos apenas para os slots ausentes.",
      lockBtn: "Travar Inventário e Prosseguir para Atualizações"
    }
  },
  navigation: {
    brand: "HardComp",
    links: {
      features: "Recursos",
      architecture: "Arquitetura",
      about: "Sobre"
    },
    actions: {
      signIn: "Entrar",
      startBuilding: "Iniciar Montagem"
    },
    footer: {
      description: "O primeiro construtor de PC Zero-Trust. Bloqueamos incompatibilidades físicas e elétricas antes mesmo do seu clique.",
      mission: {
        title: "Missão e Valores",
        item1: "Motor Zero Trust",
        item2: "Precisão de Dados",
        item3: "Arquitetura Aberta"
      },
      team: {
        title: "A Equipe",
        item1: "Sobre Nós",
        item2: "Carreiras",
        item3: "Parceiros de Hardware"
      },
      legal: {
        title: "Legal",
        item1: "Documentação",
        item2: "Política de Privacidade",
        item3: "Termos de Serviço"
      },
      copyright: "© 2026 HardComp. Todos os direitos reservados. Garantias determinísticas aplicam-se apenas a hardwares verificados."
    }
  },
  builder: {
    categories: {
      selectProcessor: "Selecionar Processador",
      selectMotherboard: "Selecionar Placa-Mãe",
      memory: "Memória",
      graphics: "Placa de Vídeo",
      storage: "Armazenamento",
      powerSupply: "Fonte de Alimentação"
    },
    nodes: {
      processor: "Processador",
      motherboard: "Placa-Mãe",
      memory: "Memória",
      graphics: "Placa de Vídeo",
      storage: "Armazenamento",
      powerSupply: "Fonte de Alimentação"
    },
    header: {
      returnHub: "Voltar ao Hub",
      breadcrumb: "Construtor / Inicialização",
      title: "Selecione seu Componente Âncora",
      subtitle: "O motor Zero-Trust requer uma fundação. Escolha um Processador ou Placa-Mãe para inicializar o grafo topológico."
    },
    badges: {
      awaitingAnchor: "Aguardando Âncora",
      pendingInput: "Aguardando Entrada",
      graphUninitialized: "GRAFO_NAO_INICIALIZADO"
    },
    graph: {
      initialized: "GRAFO_INICIALIZADO"
    },
    inventory: {
      title: "Catálogo de Hardware"
    },
    alerts: {
      incompatibilityTitle: "Alerta de Incompatibilidade",
      affectedComponents: "Componentes Afetados"
    },
    actions: {
      replace: "Substituir",
      cancel: "Cancelar",
      confirmPurge: "Confirmar Expurgo",
      share: "Compartilhar Montagem"
    },
    sidebar: {
      title: "Grafo de Arquitetura"
    },
    messages: {
      msg001: "MSG-001: Incompatibilidade de Socket (Processador/Placa-Mãe).",
      msg002: "MSG-002: TDP excede 80% da capacidade da Fonte de Alimentação.",
      msg003: "MSG-003: Incompatibilidade de Geração de Memória RAM.",
      msg004: "MSG-004: Atenção! Remover a peça {comp} tornará {count} componente(s) dependente(s) incompatível(is).",
      msg005: "MSG-005: Atenção! Substituir esta peça causará um conflito topológico com {count} componente(s) já instalado(s).",
      shareSuccess: "Link copiado para a área de transferência.",
      importError: "O link da configuração está corrompido ou é inválido."
    },
    footer: {
      totalInvestment: "Investimento Total",
      totalTdp: "Consumo Total TDP",
      psuLimit: "Limite Alvo da Fonte",
      finalize: "Finalizar Montagem"
    }
  },
  wizard: {
    header: {
      returnHub: "Voltar ao Hub",
      breadcrumb: "Assistente / Restrições Paramétricas",
      title: "Defina suas restrições",
      subtitle: "O motor determinístico consultará nossa matriz curada de montagens pré-validadas com base em seus parâmetros estritos."
    },
    investment: {
      label: "Teto Máximo de Investimento"
    },
    workload: {
      label: "Carga de Trabalho e Resolução Alvo",
      competitive: {
        title: "Jogos Competitivos em 1080p",
        tier: "[ TIER_ENTRADA ]"
      },
      office: {
        title: "Escritório e Produtividade",
        tier: "[ TIER_BASE ]"
      },
      enthusiast: {
        title: "Jogos AAA em 4K e Renderização",
        tier: "[ TIER_ENTUSIASTA ]"
      }
    },
    messages: {
      budgetInsufficient: "MSG-023: Orçamento Insuficiente para o Tier de Hardware",
      databaseEngine: "Mecanismo de Busca: ",
      msg028: "MSG-028: Personalização carregada. Você pode alterar peças à vontade.",
      customize: "Personalizar Configuração",
      matchesFound: "Mecanismo de Busca: {{count}} montagem(ns) compatível(is)."
    },
    actions: {
      reset: "Redefinir Parâmetros",
      query: "Consultar Montagens Validadas"
    }
  }
} as const;
