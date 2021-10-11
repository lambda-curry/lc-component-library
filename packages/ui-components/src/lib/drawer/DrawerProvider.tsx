import React, { FC, createContext, Context, useContext, useReducer } from 'react';
import { drawerActions, DrawerActions, DrawerReducer } from './drawer.helpers';

export const DrawerStateContext: Context<any> = createContext({});

export const DrawerActionContext: Context<DrawerActions> = createContext({} as DrawerActions);

export const useDrawer = () => {
  const drawerState = useContext(DrawerStateContext);
  const drawerActions = useContext(DrawerActionContext);

  return { drawerState, drawerActions };
};

export const DrawerProvider: FC<any> = ({ children }) => {
  const [state, dispatch] = useReducer(DrawerReducer, { data: {} });

  return (
    <DrawerStateContext.Provider value={state}>
      <DrawerActionContext.Provider value={drawerActions(state, dispatch)}>{children}</DrawerActionContext.Provider>
    </DrawerStateContext.Provider>
  );
};
