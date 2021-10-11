/// <reference types="react" />
import { OptionsObject, SnackbarKey, SnackbarMessage } from 'notistack';
export declare const Snackbar: {
    Action: import("react").FC<import("./SnackbarAction").SnackbarActionProps>;
    ActionPrimary: import("react").FC<import("./SnackbarAction").SnackbarActionProps>;
    Provider: import("react").FC<import("./SnackbarProvider").SnackbarProviderProps>;
};
export declare const useSnackbar: () => {
    addSnackbar: (message: SnackbarMessage, options?: OptionsObject | undefined) => SnackbarKey;
    removeSnackbar: (key?: SnackbarKey | undefined) => void;
};
