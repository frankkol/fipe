import { useState, useCallback, useRef, useEffect } from 'react';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  fetchData: (urlOverride?: string) => Promise<void>;
}

export function useFetch<T>(initialUrl?: string): FetchState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(async (urlOverride?: string) => {
    const url = urlOverride || initialUrl;
    if (!url) return;

    // Cancela requisição pendente antes de iniciar nova
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, { signal: controller.signal });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.message || `Erro: ${response.status}`;
        throw new Error(errorMessage);
      }

      const json = await response.json();
      setData(json);
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        setError(err as Error);
      }
    } finally {
      setLoading(false);
    }
  }, [initialUrl]);

  // Cleanup ao desmontar
  useEffect(() => {
    return () => abortControllerRef.current?.abort();
  }, []);

  return { data, loading, error, fetchData };
}