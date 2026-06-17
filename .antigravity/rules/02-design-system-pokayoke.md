---
name: hardcomp-design-system
description: Garante a aplicação estrita dos design tokens e da estética de interface técnica.
---

# Design System e Composição UI

- **Tematização**: Dark Mode irreversível. Background `bg-[#121212]`, Surfaces `bg-[#1E1E1E]`. Sem gradientes extravagantes, sem bordas excessivamente arredondadas.
- **Tipografia Escalonada**: 
  - UI Geral e Ações: `font-sans` (Inter).
  - Métricas e Dados Técnicos (Watts, R$, Códigos): OBRIGATÓRIO uso de `font-mono` (JetBrains Mono).
- **Padrão Poka-Yoke (Disabled State)**: Componentes incompatíveis não somem da tela. Eles DEVEM receber opacidade de 40%, filtro `grayscale`, ter sua área de clique inativada e exibir um Badge central inferior `#FF3B30` com o texto do Tooltip mapeado pelo i18n.
- **Barra Reativa**: O componente inferior de fixação de métricas deve calcular o TDP total e investimento dinamicamente, atualizando em menos de 50ms (RNF01). Se a regra do TDP ultrapassar o limite, a barra passa para o estado de erro e trava o CTA primário.
- **Estabilidade de Layout (Anti-Shift)**: É terminantemente proibido usar animações ou estados de hover que alterem o tamanho de bordas, margens ou paddings de componentes irmãos (ex: mudar `border-0` para `border-2` no hover). Use opacidade, transição de cor de fundo (`transition-colors duration-150`) ou sombras internas.
- **Saneamento de Ícones (No-Emoji)**: Proibido o uso de emojis (ex: 🚀, ⚠️, 💡) como elementos de interface ou marcadores de status. Toda iconografia técnica deve utilizar SVGs limpos (Lucide React) com tamanho fixo (`w-4 h-4` para tabelas/métricas, `w-5 h-5` para ações).
- **Z-Index Determinístico**: A escala de sobreposição de elementos na UI deve seguir estritamente:
  - Base Layout / Grids: `z-0`
  - Barra Reativa Inferior: `z-40`
  - Tooltips de Erro / Poka-Yoke Badges: `z-50`
- **Acessibilidade Semântica Industrial**: Toda a interface deve respeitar os padrões WCAG 2.1 AA. Elementos interativos inválidos pelo Poka-Yoke ou botões de ação que executam validações de hardware pesadas devem obrigatoriamente usar estados acessíveis adequados (ex: `aria-busy="true"` em loadings, `aria-disabled="true"` em vez de apenas mitigar o clique, e `htmlFor` explicitamente associando labels a inputs ou seletores).
- **Tratamento de Estados Vazios e de Erro (Defensive UI)**: Telas de catálogo, filtros ou inventários técnicos não podem renderizar telas em branco ou feedbacks genéricos. Se nenhum componente for compatível com o soquete selecionado, exiba um estado vazio descritivo contendo a causa técnica e uma ação clara de reversão (ex: botão para redefinir o filtro ou trocar a placa-mãe).
