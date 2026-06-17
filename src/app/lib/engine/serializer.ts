export function encodeBuildToURL(componentIds: string[]): string {
  try {
    const jsonStr = JSON.stringify(componentIds);
    return btoa(jsonStr);
  } catch (e) {
    return "";
  }
}

export function decodeBuildFromURL(base64String: string): string[] | null {
  try {
    const jsonStr = atob(base64String);
    const parsed = JSON.parse(jsonStr);
    if (Array.isArray(parsed) && parsed.every(id => typeof id === 'string')) {
      return parsed;
    }
    return null;
  } catch (e) {
    return null;
  }
}
