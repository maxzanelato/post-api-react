import { useEffect, useRef } from 'react';

export function useApiErrorAlert(error: Error | null | undefined) {
  const lastShownError = useRef<Error | null>(null);

  useEffect(() => {
    if (error && lastShownError.current !== error) {
      lastShownError.current = error;
      window.alert(`Ocorreu um erro: ${error.message}`);
    }
  }, [error]);
}