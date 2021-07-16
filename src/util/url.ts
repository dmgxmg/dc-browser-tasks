export function toUrlString(url: string, params: Record<string, any>) {
  const urlObject = new URL(url);
  urlObject.search = new URLSearchParams(params).toString();
  return urlObject.toString();
}
