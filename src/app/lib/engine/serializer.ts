import { Componente } from "../../types/store";
import { CATALOGO_HARDWARE } from "./mockData";

export function encodeBuildToURL(componentIds: string[]): string {
  try {
    const jsonStr = JSON.stringify(componentIds);
    return btoa(jsonStr);
  } catch (e) {
    return "";
  }
}

// O payload da URL NUNCA carrega propriedades, apenas referências de chaves primárias.
export const decodeBuildFromURL = (base64Payload: string): Componente[] => {
  try {
    const jsonString = atob(base64Payload);
    const ids: string[] = JSON.parse(jsonString); // Ex: ["cpu-123", "mobo-456"]

    if (!Array.isArray(ids)) return [];

    // O verdadeiro Zero-Trust: Reidrata as peças DIRETAMENTE da fonte de verdade (mockData/catalog), 
    // ignorando qualquer atributo forjado pelo lado do cliente.
    const hydratedComponents = ids
      .map(id => CATALOGO_HARDWARE.find(c => c.id === id))
      .filter((comp): comp is Componente => comp !== undefined);

    return hydratedComponents;
  } catch (error) {
    console.error("FALHA_DECODIFICACAO_URL", error);
    return [];
  }
};
