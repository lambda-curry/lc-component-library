export const isNullOrUndefined: (a: any) => boolean = a => a == null;

export const lowercaseString: (value: string | number) => string = value => `${value}`.toLowerCase();

export const isBrowser = () => typeof window !== 'undefined';
