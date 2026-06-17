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
  const t = (path: DicionarioKeys | string, params?: Record<string, string | number>): string => {
    let result = path.split(".").reduce((obj: unknown, key: string) => {
      if (obj && typeof obj === "object" && key in obj) {
        return (obj as Record<string, unknown>)[key];
      }
      return obj;
    }, dictionary) as string;

    if (params && typeof result === 'string') {
      Object.entries(params).forEach(([k, v]) => {
        result = result.replace(new RegExp(`{{${k}}}`, 'g'), String(v));
      });
    }

    return result || path;
  };
  
  return { t };
}
