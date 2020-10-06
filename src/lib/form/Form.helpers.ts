export interface FormReducerState {
  activeModal: FormModals;
  shouldCheckForUnsavedChanges: boolean;
  capturedUnsavedChangesEvent?: Event;
}

// export type ServerRequestStatus = 'waiting' | 'sending' | 'sent' | 'error';
export type FormModals = 'none' | 'unsavedChangesModal';

export interface FormReducerAction {
  name: keyof typeof formReducers;
  payload?: any;
}

const formReducers = {
  closeModal: (state: FormReducerState, _: any) => ({ ...state, activeModal: 'none' as FormModals }),
  openModal: (state: FormReducerState, activeModal: FormModals) => ({ ...state, activeModal }),
  setShouldCheckForUnsavedChanges: (state: FormReducerState, shouldCheckForUnsavedChanges: boolean) => ({
    ...state,
    shouldCheckForUnsavedChanges
  }),
  setCapturedUnsavedChangesEvent: (state: FormReducerState, capturedUnsavedChangesEvent: Event) => ({
    ...state,
    capturedUnsavedChangesEvent
  })
};

export const formReducer = (state: FormReducerState, action: FormReducerAction) => {
  if (!formReducers[action.name]) {
    throw new Error(`reducer ${action.name} not defined`);
  }

  const nextState: FormReducerState = formReducers[action.name](state, action.payload);
  return nextState;
};
