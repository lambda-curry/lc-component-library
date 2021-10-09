import { SnackbarAction } from './SnackbarAction';
import { SnackbarActionPrimary } from './SnackbarActionPrimary';
import { SnackbarProvider } from './SnackbarProvider';
import { OptionsObject, SnackbarKey, SnackbarMessage, useSnackbar as useNotistackUseSnackbar } from 'notistack';

export const Snackbar = { Action: SnackbarAction, ActionPrimary: SnackbarActionPrimary, Provider: SnackbarProvider };

// Add aliases for the useSnackbar methods
// and allow importing side-by-side with our custom Snackbar component
export const useSnackbar = (): {
  addSnackbar: (message: SnackbarMessage, options?: OptionsObject) => SnackbarKey;
  removeSnackbar: (key?: SnackbarKey) => void;
} => {
  const { enqueueSnackbar, closeSnackbar } = useNotistackUseSnackbar();

  return { addSnackbar: enqueueSnackbar, removeSnackbar: closeSnackbar };
};
