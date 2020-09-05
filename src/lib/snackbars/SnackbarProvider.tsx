import React, { FC, ReactNode } from 'react';
import { SnackbarProvider as MuiSnackbarProvider, ProviderContext as SnackbarProviderContext } from 'notistack';
import { SnackbarAction } from './SnackbarAction';

import './snackbars.scss';

export const SnackbarProvider: FC<{ children: ReactNode }> = props => {
    // Add default action to all snackbars
    const snackbarProviderRef = React.createRef<SnackbarProviderContext>();
    const onClickDismiss = (key: string) => {
        snackbarProviderRef?.current?.closeSnackbar(key);
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
