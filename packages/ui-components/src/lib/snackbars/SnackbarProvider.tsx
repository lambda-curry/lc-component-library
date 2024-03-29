import React, { FC, ReactNode, createRef } from 'react';
import { SnackbarProvider as MuiSnackbarProvider, SnackbarKey } from 'notistack';
import { SnackbarAction } from './SnackbarAction';

import './snackbars.css';

export interface SnackbarProviderProps {
  children: ReactNode;
}

export const SnackbarProvider: FC<SnackbarProviderProps> = props => {
  // Add default action to all snackbars
  const snackbarProviderRef = createRef<MuiSnackbarProvider>();
  const onClickDismiss = (key: SnackbarKey) => {
    if (snackbarProviderRef?.current) snackbarProviderRef.current.closeSnackbar(key);
  };

  return (
    // TODO: #106 Fix React 18 TypeScript errors @jaredhill4
    // @ts-ignore
    <MuiSnackbarProvider
      ref={snackbarProviderRef}
      classes={{
        root: 'snackbar',
        containerRoot: 'snackbars',
        variantInfo: 'snackbar-info',
        variantSuccess: 'snackbar-success',
        variantWarning: 'snackbar-warning',
        variantError: 'snackbar-danger'
      }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      action={(key: SnackbarKey) => <SnackbarAction onClick={() => onClickDismiss(key)}>Dismiss</SnackbarAction>}
      {...props}
    />
  );
};
