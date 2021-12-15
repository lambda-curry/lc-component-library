import { useEffect } from 'react';
import _isEqual from 'lodash/isEqual';
import _debounce from 'lodash/debounce';
import { usePrevious } from './usePrevious';

const defaultPersistFunction = <T>(persistKey: string) => {
  if (typeof window === 'undefined') return () => null;
  return (values: T) => window.localStorage.setItem(persistKey, JSON.stringify(values));
};

export const usePersistedFormValues = <T>(
  values: T,
  persistKeyOrFunction?: string | ((values: T) => void),
  debounce?: number
) => {
  const previousValues = usePrevious(values);

  useEffect(() => {
    if (!persistKeyOrFunction || !_isEqual(values, previousValues)) return;

    const persistFunction =
      typeof persistKeyOrFunction === 'string' ? defaultPersistFunction<T>(persistKeyOrFunction) : persistKeyOrFunction;

    const debouncedPersistFunction = _debounce(persistFunction, debounce || 300);
    debouncedPersistFunction(values);
  }, [debounce, values, persistKeyOrFunction, previousValues]);
};
