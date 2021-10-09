declare type CopyStates = 'copyable' | 'copied' | 'error';
export declare function useCopyToClipboard(copyText: string, copyTarget: string, config?: {
    copied?: string;
    copyable?: string;
    error?: string;
}): [string, CopyStates];
export {};
