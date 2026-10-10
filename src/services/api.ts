const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;
  const headers = new Headers(init?.headers);
  headers.set('Accept', 'application/json');
  if (init?.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      headers,
    });
  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'AbortError') throw error;
    throw new Error('Não foi possível conectar à API. Verifique sua conexão e tente novamente.');
  }

  if (!response.ok) {
    throw new ApiError(`A API respondeu com erro HTTP ${response.status}.`, response.status);
  }

  return await response.json() as T;
}