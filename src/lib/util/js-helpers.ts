export const isNullOrUndefined: (a: any) => boolean = a => a == null;

export const lowercaseString: (value: string | number) => string = value => `${value}`.toLowerCase();
