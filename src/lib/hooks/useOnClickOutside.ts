// Based on https://usehooks.com/useOnClickOutside/
import { useEffect } from 'react';

// Hook
export function useOnClickOutside(
  handler: (event: MouseEvent) => void,
  querySelectorAll?: string,
  targetQuerySelector?: string
) {
  useEffect(
    () => {
      // Do nothing if no querySelectorAll is passed, sometimes it might be not be defined in the parent component
      // but React Hooks do not like to be wrapped in if-statements so we must do the check inside.
      if (!querySelectorAll) {
        return;
      }

      const listener = (event: MouseEvent) => {
        const containers = Array.from(document.querySelectorAll(querySelectorAll));

        if (containers.length < 1) {
          throw new Error('querySelectorAll did not find a container for the useOnClickOutside hook');
        }

        // Do nothing if event.target is not the expected target or does not exist
        if (!event.target || (targetQuerySelector && !(event as any).target.closest(targetQuerySelector))) {
          return;
        }

        // Do nothing if clicking ref's element or descendent elements
        if ((containers as Node[]).find(container => container.contains(event.target as Node))) {
          return;
        }

        handler(event);
      };

      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener as EventListener);

      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener as EventListener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [handler, querySelectorAll]
  );
}
