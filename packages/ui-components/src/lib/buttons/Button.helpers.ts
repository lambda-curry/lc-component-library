export interface ButtonReducerState {
  leftIcon: boolean;
  rightIcon: boolean;
}

export interface ButtonReducerAction {
  name: keyof typeof buttonReducers;
  payload?: any;
}

const buttonReducers = {
  setLeftIcon: (state: ButtonReducerState, leftIcon: boolean) => ({ ...state, leftIcon }),
  setRightIcon: (state: ButtonReducerState, rightIcon: boolean) => ({ ...state, rightIcon })
};

export const buttonReducer = (state: ButtonReducerState, action: ButtonReducerAction): ButtonReducerState => {
  if (!buttonReducers[action.name]) {
    throw new Error(`reducer ${action.name} not defined`);
  }

  const nextState: ButtonReducerState = buttonReducers[action.name](state, action.payload);
  return nextState;
};
