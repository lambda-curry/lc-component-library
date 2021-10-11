import { Dispatch } from 'react';
export interface DrawerType {
    name: string;
    data?: any;
}
export interface DrawerReducerState {
    active?: string;
    data: {
        [x: string]: any;
    };
}
export declare const DrawerReducers: {
    toggleDrawer: (state: DrawerReducerState, drawer: DrawerType) => {
        active?: string | undefined;
        data: {
            [x: string]: any;
        };
    };
    setDrawerData: (state: DrawerReducerState, drawer: DrawerType) => {
        active?: string | undefined;
        data: {
            [x: string]: any;
        };
    };
    clearDrawerData: (state: DrawerReducerState, drawer: DrawerType) => {
        active?: string | undefined;
        data: {
            [x: string]: any;
        };
    };
};
export interface DrawerReducerAction<T> {
    name: keyof typeof DrawerReducers;
    payload?: T;
}
export declare type DrawerDispatch<T> = Dispatch<DrawerReducerAction<T>>;
export declare const DrawerReducer: (state: DrawerReducerState, action: DrawerReducerAction<any>) => DrawerReducerState;
export interface DrawerActions {
    toggleDrawer: (payload: DrawerType) => void;
    setDrawerData: (payload: DrawerType) => void;
    clearDrawerData: (payload: DrawerType) => void;
    getDrawerData: <T>(name?: string) => T;
}
export declare const drawerActions: (state: DrawerReducerState, dispatch: DrawerDispatch<any>) => DrawerActions;
