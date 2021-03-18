import React, { useContext, useReducer } from 'react';
import { drawerActions, DrawerActions, DrawerReducer } from './drawer.helpers';

export const DrawerStateContext: React.Context<any> = React.createContext({});

export const DrawerActionContext: React.Context<DrawerActions> = React.createContext({} as DrawerActions);

export const useDrawer = () => {
  const drawerState = useContext(DrawerStateContext);
  const drawerActions = useContext(DrawerActionContext);

  return { drawerState, drawerActions };
};

export const DrawerProvider: React.FC<any> = ({ children }) => {
  const [state, dispatch] = useReducer(DrawerReducer, { data: {} });

  return (
    <DrawerStateContext.Provider value={state}>
      <DrawerActionContext.Provider value={drawerActions(state, dispatch)}>{children}</DrawerActionContext.Provider>
    </DrawerStateContext.Provider>
  );
};
