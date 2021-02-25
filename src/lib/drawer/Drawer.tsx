import { Drawer as MuiDrawer } from '@material-ui/core';
import React, { Dispatch } from 'react';
import './drawer.css';

export interface DrawerType {
  id: string;
  data: any;
}

export interface DrawerReducerState {
  activeDrawer?: DrawerType;
}

export const DrawerReducers = {
  toggleDrawer: (state: DrawerReducerState, drawer: DrawerType) => {
    if (!state.activeDrawer) {
      return { ...state, drawer };
    }

    if (state.activeDrawer.id === drawer.id) {
      delete state.activeDrawer;
      return { ...state };
    }

    return { ...state, activeDrawer: drawer };
  }
};

export interface DrawerReducerAction<T> {
  name: keyof typeof DrawerReducers;
  payload?: T;
}

export type DrawerDispatch<T> = Dispatch<DrawerReducerAction<T>>;

export const DrawerReducer = (state: DrawerReducerState, action: DrawerReducerAction<any>) => {
  if (!DrawerReducers[action.name]) {
    throw new Error(`reducer ${action.name} not defined`);
  }

  const nextState: DrawerReducerState = DrawerReducers[action.name](state, action.payload);
  return nextState;
};

export const DrawerActions = (state: DrawerReducerState, dispatch: DrawerDispatch<any>) => ({
  toggleDrawer: (payload: DrawerType) => dispatch({ name: 'toggleDrawer', payload })
});

export const toggleDrawer: (
  open: boolean,
  setOpen: (open: boolean) => void
) => (event: React.KeyboardEvent | React.MouseEvent) => void = (open, setOpen) => event => {
  if (
    event.type === 'keydown' &&
    ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
  )
    return;

  setOpen(!open);
};

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export interface DrawerProps {
  open?: boolean;
  setOpen: (open: boolean) => void;
  options?: { anchor?: Anchor; minWidth: number };
}

export const Drawer: React.FC<DrawerProps> = ({ open = false, setOpen, children, options: overrides }) => {
  const options = {
    anchor: 'right' as Anchor,
    minWidth: 300,
    ...overrides
  };

  return (
    <MuiDrawer className="lc-drawer" anchor={options.anchor} open={open} onClose={toggleDrawer(open, setOpen)}>
      <div className="lc-drawer-content" style={{ minWidth: `${options.minWidth}px` }}>
        {children}
      </div>
    </MuiDrawer>
  );
};
