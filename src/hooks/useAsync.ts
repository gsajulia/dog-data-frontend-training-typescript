import { useState, useEffect } from "react";

interface UseAsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export const useAsync = <T>(
  asyncFunction: () => Promise<T>,
  deps: React.DependencyList,
) => {
  const [state, setState] = useState<UseAsyncState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      setState({ data: null, loading: true, error: null });

      try {
        const response = await asyncFunction();
        if (!cancelled) {
          setState({ data: response, loading: false, error: null });
        }
      } catch (error) {
        if (!cancelled) {
          setState({ data: null, loading: false, error: error as Error });
        }
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, deps);

  return state;
};
