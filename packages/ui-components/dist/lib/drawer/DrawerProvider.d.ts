import { FC, Context } from 'react';
import { DrawerActions } from './drawer.helpers';
export declare const DrawerStateContext: Context<any>;
export declare const DrawerActionContext: Context<DrawerActions>;
export declare const useDrawer: () => {
    drawerState: any;
    drawerActions: DrawerActions;
};
export declare const DrawerProvider: FC<any>;
