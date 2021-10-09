import { FC, ReactNode } from 'react';
import './snackbars.css';
export interface SnackbarProviderProps {
    children: ReactNode;
}
export declare const SnackbarProvider: FC<SnackbarProviderProps>;
