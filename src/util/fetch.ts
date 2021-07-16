export function fetchJson(url: string, options?: RequestInit) {
  return fetch(url, {
    credentials: "same-origin",
    ...options,
  }).then((response) => response.json());
}

export function postJson(url: string, options?: RequestInit) {
  return fetchJson(url, {
    method: "POST",
    ...options,
  });
}
