import { useEffect, useState } from 'react';

// Returns a tuple with [responseData, catchError] from a promise.
// The catchError will return as null if there is no caught error.
// If there is a caught error, the responseData will be sent as an empty object.
// Adapted from https://dev.to/sobiodarlington/better-error-handling-with-async-await-2e5m
export const handlePromise: <T = any>(promise: Promise<any>) => Promise<[T | null, any]> = <T>(promise: Promise<any>) =>
  promise.then((data: T) => [data, null] as [T, any]).catch(err => [null, err]);

// The useAsyncEffect function is a custom hook to pass asynchronous functions into.
// Most helpful when you only want to load data once in functional components (since you don't have access to the
// lifecycle hooks).
// Adapted from https://github.com/facebook/react/issues/14326
export const useAsyncEffect = (effect: () => Promise<any>, onDestroy?: (arg: any) => void, inputs: any[] = []) => {
  let stillAround = true;
  let result: any;

  useEffect(() => {
    if (stillAround) {
      effect()
        // eslint-disable-next-line react-hooks/exhaustive-deps
        .then(value => (result = value))
        .catch(err => {
          console.log('useAsyncEffect error:', err);
          throw new Error(err);
        });
    }

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      stillAround = false;
      if (typeof onDestroy === 'function') {
        onDestroy(result);
      }
    };
  }, inputs);
};

// Src: https://usehooks.com/useDebounce/
export const useDebounce = (value: any, delay: number) => {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );

  return debouncedValue;
};
