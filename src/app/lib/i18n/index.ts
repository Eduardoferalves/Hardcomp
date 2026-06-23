import { dictionary } from "./dictionary";

type LeafPaths<T, D extends string = "."> = T extends Record<string, any>
  ? {
      [K in keyof T & (string | number)]: T[K] extends Record<string, any>
        ? `${K}${D}${LeafPaths<T[K], D>}`
        : `${K}`;
    }[keyof T & (string | number)]
  : never;

export type DicionarioKeys = LeafPaths<typeof dictionary>;

export function useTranslation() {
  const t = (key: string, params?: Record<string, string | number>): string => {
    let text = key.split(".").reduce((obj: any, k: string) => {
      if (obj && typeof obj === "object" && k in obj) {
        return obj[k];
      }
      return undefined;
    }, dictionary) as string;

    if (!text && typeof dictionary === 'object' && key in dictionary) {
      text = (dictionary as any)[key];
    }

    if (!text) {
      text = key;
    }
    
    // Motor de Interpolação Lexical
    if (params && typeof text === 'string') {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        // Substitui padrões como [Peça] ou [N] pelos valores dinâmicos
        const regex = new RegExp(`\\[${paramKey}\\]`, 'gi');
        text = text.replace(regex, String(paramValue));
      });
    }
    
    return text;
  };

  return { t };
}
