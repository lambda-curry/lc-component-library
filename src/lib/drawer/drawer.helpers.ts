import { Dispatch } from 'react';

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
