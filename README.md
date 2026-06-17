# HardComp

## 1. Sobre o HardComp
O HardComp é um Sistema de Apoio à Decisão (DSS - Decision Support System) neutro, preventivo e focado no mercado brasileiro de hardware. Projetado como uma ferramenta "Zero-Trust", o sistema não confia em achismos: ele intercepta, calcula e previne ativamente incompatibilidades físicas e elétricas antes mesmo do usuário finalizar sua construção. Diferente de e-commerces tradicionais, o foco do HardComp é fornecer a garantia matemática de que um conjunto de peças funcionará em harmonia, priorizando a estabilidade topológica do computador.

## 2. Pilares da Arquitetura Core

### Motor Lógico (Specification Pattern)
A espinha dorsal da aplicação baseia-se em regras de validação puramente determinísticas implementadas por meio do padrão de especificações (Specification Pattern). As principais métricas de bloqueio incluem:
- **Restrição de Soquete:** Prevenção de acoplamento entre Processadores e Placas-mãe de soquetes divergentes (ex: AM4 vs LGA1700).
- **Geração de RAM:** Validação imperativa de geração (DDR4 vs DDR5) exigida pela Placa-Mãe.
- **Teto Elétrico Estrito:** A soma total do TDP de todas as peças (consumo térmico em Watts) jamais pode ultrapassar 80% da capacidade nominal (limite seguro) da Fonte de Alimentação escolhida, garantindo eficiência de curva de entrega (80 Plus) e segurança térmica.

### Gestão de Estado Global e Eviction Policy (Zustand)
O estado crítico de montagem do grafo de hardware utiliza `Zustand` para a distribuição em árvore, configurado com uma persistência `offline-first` via `localStorage`.
- **Eviction Policy Temporal:** Com verificação de timestamps via padrão `ISO 8601`, o sistema engatilha um expurgo automático (Cold Start/Reset) após 7 dias de inatividade ininterrupta da sessão, otimizando o lixo de navegador do cliente e protegendo-o de orçamentos ou peças defasadas.
- **Seletores Atômicos:** Todo consumo de estado pelos componentes utiliza seletores atômicos explícitos (ex: `state => state.activeCart`), mitigando *performance leaks* e re-renderizações parasitas na árvore DOM.

### Mecanismo Stateless de Compartilhamento (Base64)
Para cenários de distribuição (Share) da build montada, o sistema compila o estado topológico atual extraindo um array enxuto de UUIDs correspondente às peças selecionadas. Essa estrutura é serializada, comprimida e transformada em payload `Base64` via querystring da URL.
- **Hidratação Defensiva:** Durante o parse (importação) deste link por outro usuário, a validação é executada em modelo Zero-Trust. Caso haja quebra de integridade topológica, payload corrompido, ou injeção de parâmetros maliciosos, a árvore bloqueia a execução, exibe erro e reverte para a montagem de fallback.

### Poka-Yoke UI & Expurgo em Cascata
O front-end utiliza o princípio industrial de prova de erros (Poka-Yoke).
- **Regressão Visual:** Peças incompatíveis dentro do pool de catálogos sofrem decaimento de opacidade visual (40% de opacidade) com desaturação de cores (grayscale), acompanhadas de bloqueios de clique interativos.
- **Expurgo em Cascata:** Sempre que uma peça é removida voluntariamente (como uma Placa-mãe ou Processador), qualquer componente já presente no setup e que exija dependência estrita dela é interceptado por AlertDialogs. Confirmando a remoção, a UI aciona uma cascata topológica destrutiva e higieniza todas as ramificações dependentes automaticamente.

## 3. Internacionalização (i18n)
O sistema conta com um motor completo de internacionalização (i18n), com 100% dos nós taxonômicos livres de hardcoding (texto fixo). A camada visual se comunica exclusivamente com um dicionário TypeScript seguro (fortemente tipado via `as const`). O hook dinâmico `useTranslation` intercepta as strings e provê tokens para interpolação injetada (ex: manipulação algorítmica substituindo `{{count}}` pelos inteiros de runtime apropriados).

## 4. Conformidade de Acessibilidade (WCAG 2.1 AA)
A integridade de interface e a navegação da aplicação respeitam mapeamentos semânticos rigorosos, operando sob conformidade técnica WCAG 2.1 nível AA.
- Formulários, botões e alertas usam semântica apropriada (ARIA Labels e modais com portal trapping).
- A aplicação é 100% percorrível e acionável por teclado puro, validando lógicas e ativações com uso ininterrupto da tecla TAB e listeners acionados via "Enter" ou "Space", sem requerer navegação guiada por mouse.

## 5. Stack Técnica
As seguintes tecnologias formam o ambiente modular do HardComp:
- **Vite** (Module Bundler)
- **React 18** (View Library)
- **Tailwind CSS v4** (Utility-first framework)
- **Zustand** (Atomic Global State)
- **TypeScript** (Tipagem Estática Pura)
- **Lucide React** (Pacote Vetorial de Ícones SVG)
- **Radix UI / Shadcn** (Primitivas de Componentes Acessíveis e Unstyled)

## 6. Scripts de Desenvolvimento

### Instalação de Dependências
Certifique-se de possuir o Node.js v20+ e, na raiz do projeto, instale as dependências:
\`\`\`bash
npm install
\`\`\`

### Execução Local (Development Engine)
Inicie o servidor de desenvolvimento Vite (com HMR).
\`\`\`bash
npm run dev
\`\`\`
> A porta padrão exposta será tipicamente `localhost:5173`.

### Compilação de Produção
Para efetuar o bundle agressivo, otimização e verificação final de tipagem para artefato estático web:
\`\`\`bash
npm run build
\`\`\`