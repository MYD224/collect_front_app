export async function httpPost<TResponse, TBody = unknown>(
  url: string,
  body: TBody,
  init?: RequestInit,
): Promise<TResponse> {
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
    body: JSON.stringify(body),
    ...init,
  });

  if (!resp.ok) {
    // à améliorer : mapping d'erreurs
    throw new Error(`HTTP error ${resp.status}`);
  }

  return resp.json() as Promise<TResponse>;
}
