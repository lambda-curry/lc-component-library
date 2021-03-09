import { Drawer as MuiDrawer } from '@material-ui/core';
import classNames from 'classnames';
import React, { Dispatch } from 'react';
import './drawer.css';
import { useDrawer } from './DrawerProvider';

export interface DrawerType {
  name: string;
  data?: any;
}

export interface DrawerReducerState {
  active?: string;
  data: { [x: string]: any };
}

export const DrawerReducers = {
  toggleDrawer: (state: DrawerReducerState, drawer: DrawerType) => {
    if (state.active === drawer.name) {
      delete state.active;
      return { ...state };
    }

    if (drawer.data) {
      state.data[drawer.name] = Object.assign(state.data[drawer.name] || {}, drawer.data);
    }

    return { ...state, active: drawer.name };
  },
  setDrawerData: (state: DrawerReducerState, drawer: DrawerType) => {
    state.data[drawer.name] = Object.assign(state.data[drawer.name] || {}, drawer.data);
    return { ...state };
  },
  clearDrawerData: (state: DrawerReducerState, drawer: DrawerType) => {
    delete state.data[drawer.name];
    return { ...state };
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

export interface DrawerActions {
  toggleDrawer: (payload: DrawerType) => void;
  setDrawerData: (payload: DrawerType) => void;
  clearDrawerData: (payload: DrawerType) => void;
  getDrawerData: <T>(name?: string) => T;
}

export const drawerActions: (state: DrawerReducerState, dispatch: DrawerDispatch<any>) => DrawerActions = (
  state,
  dispatch
) => ({
  toggleDrawer: (payload: DrawerType) => dispatch({ name: 'toggleDrawer', payload }),
  setDrawerData: (payload: DrawerType) => dispatch({ name: 'setDrawerData', payload }),
  clearDrawerData: (payload: DrawerType) => dispatch({ name: 'clearDrawerData', payload }),
  getDrawerData: (name?: string) => {
    if (name) return state.data[name] ?? {};
    return state.data;
  }
});

const toggleDrawer: (
  name: string,
  toggleFunction: (drawer: DrawerType) => void
) => (event: React.KeyboardEvent | React.MouseEvent) => void = (name, toggleFunction) => event => {
  if (
    event.type === 'keydown' &&
    ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
  )
    return;

  toggleFunction({ name });
};

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export interface DrawerProps {
  name: string;
  className?: string;
  options?: { anchor?: Anchor; minWidth: number };
}

export const Drawer: React.FC<DrawerProps> = ({ name, className, children, options: overrides }) => {
  const options = {
    anchor: 'right' as Anchor,
    width: 300,
    ...overrides
  };

  const { drawerActions, drawerState } = useDrawer();

  const isOpen = drawerState.active === name;

  return (
    <MuiDrawer
      className={classNames('lc-drawer', className)}
      anchor={options.anchor}
      open={isOpen}
      onClose={toggleDrawer(name, drawerActions.toggleDrawer)}
    >
      {/* TODO: Remove `px` from width to allow setting width with other units.  */}
      <div className="lc-drawer-content" style={{ width: `${options.width}px` }}>
        {children}
      </div>
    </MuiDrawer>
  );
};
