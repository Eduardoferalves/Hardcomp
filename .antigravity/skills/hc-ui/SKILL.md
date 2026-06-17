---
name: hc-ui
description: Skill de Frontend Engineering sênior para transformar mockups anêmicos em interfaces reativas de produção.
argument-hint: caminho-do-arquivo
---

# HardComp UI Refactoring

Execute a refatoração do arquivo especificado transformando-o em um componente React de nível de produção, aderente ao Design System do HardComp.

1. **Separação de Preocupações**: Se o componente tiver mais de 100 linhas com estado e marcação misturados, quebre-o. Crie `hooks` customizados (ex: `useWizardState.ts`) e deixe o componente principal focado em renderização.
2. **Purgatório do AI Slop**: Remova qualquer texto estático em inglês ("Return to Hub", "Select Processor"). Substitua por variáveis ou placeholders para implementação de dicionário (ex: `t('builder.cold_start.select_cpu')`).
3. **Poka-Yoke Ready**: Se houver listas de componentes (cards), o mapeamento deve incluir o suporte para a *prop* `isInvalid`. Quando `isInvalid === true`, aplique rigorosamente as classes Tailwind correspondentes à regra `Poka-Yoke (Disabled State)` das regras arquiteturais.
4. **Verificação (Exit Criteria)**:
   - Nenhum texto hardcoded em inglês mantido.
   - Variáveis de estado tipadas (TypeScript).
   - Componentes menores e com responsabilidade única.
   - Todos os elementos clicáveis (`button`, `a`, cards interativos) possuem explicitamente a classe `cursor-pointer` ou `cursor-not-allowed` (se inválido).
   - Botões que disparam validações pesadas ou navegação possuem estado de loading visual e desativação de clique (`disabled`).
   - Nenhum emoji foi introduzido no código gerado.
   - Consumo do store Zustand realizado exclusivamente via seletores atômicos.
   - Operações de cálculo cumulativo (TDP, Preços) e filtros de compatibilidade encapsulados em `useMemo`.
   - Ausência completa de tipagem frouxa (`any`) ou assinaturas de métodos implícitas.
   - Componente estruturado com base em composição limpa, sem acoplamento de lógica de negócios complexa no bloco principal de renderização.
   - Elementos interativos e de feedback Poka-Yoke cobertos com atributos ARIA (`aria-label`, `aria-disabled`, `aria-busy`) onde aplicável.
   - Validação completa de que nenhum componente ultrapassa o limite saudável de legibilidade e responsabilidade única antes de fechar a tarefa.
