export declare function useOnClickOutside(handler: (event: MouseEvent | TouchEvent) => void, // action to take when clicked outside
querySelectorAll?: string, // items to query and watch for clicks outside of
targetQuerySelector?: string, // items outside of the query that can be clicked on without triggering the handler
allowTarget?: string): void;
