export declare const handlePromise: <T = any>(promise: Promise<any>) => Promise<[T | null, any]>;
export declare const useAsyncEffect: (effect: () => Promise<any>, onDestroy?: ((arg: any) => void) | undefined, inputs?: any[]) => void;
export declare const useDebounce: (value: any, delay: number) => any;
