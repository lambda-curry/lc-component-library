import React, { FC, ReactNode } from 'react';
import { SnackbarProvider as MuiSnackbarProvider } from 'notistack';
import { SnackbarAction } from './SnackbarAction';

import './snackbars.css';

export const SnackbarProvider: FC<{ children: ReactNode }> = props => {
  // Add default action to all snackbars
  const snackbarProviderRef = React.createRef<MuiSnackbarProvider>();
  const onClickDismiss = (key: string) => {
    if (snackbarProviderRef?.current) snackbarProviderRef.current.closeSnackbar(key);
  };

  return (
    <MuiSnackbarProvider
      ref={snackbarProviderRef}
      classes={{
        root: 'snackbar',
        containerRoot: 'snackbars'
      }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      action={(key: string) => <SnackbarAction onClick={() => onClickDismiss(key)}>Dismiss</SnackbarAction>}
      {...props}
    />
  );
};
