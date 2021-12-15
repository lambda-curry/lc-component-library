import { useEffect } from 'react';
import _isEqual from 'lodash/isEqual';
import _debounce from 'lodash/debounce';
import { usePrevious } from './usePrevious';

export const usePersistedFormValues = <T>(values: T, persistFunction?: (values: T) => void, debounce?: number) => {
  const previousValues = usePrevious(values);

  useEffect(() => {
    if (!persistFunction || !_isEqual(values, previousValues)) return;

    const debouncedPersistFunction = _debounce(persistFunction, debounce || 300);
    debouncedPersistFunction(values);
  }, [debounce, values, persistFunction, previousValues]);
};
