export interface FormReducerState {
    activeModal: FormModals;
    shouldCheckForUnsavedChanges: boolean;
    capturedUnsavedChangesEvent?: Event;
}
export declare type FormModals = 'none' | 'unsavedChangesModal';
export interface FormReducerAction {
    name: keyof typeof formReducers;
    payload?: any;
}
declare const formReducers: {
    closeModal: (state: FormReducerState, _: any) => {
        activeModal: FormModals;
        shouldCheckForUnsavedChanges: boolean;
        capturedUnsavedChangesEvent?: Event | undefined;
    };
    openModal: (state: FormReducerState, activeModal: FormModals) => {
        activeModal: FormModals;
        shouldCheckForUnsavedChanges: boolean;
        capturedUnsavedChangesEvent?: Event | undefined;
    };
    setShouldCheckForUnsavedChanges: (state: FormReducerState, shouldCheckForUnsavedChanges: boolean) => {
        shouldCheckForUnsavedChanges: boolean;
        activeModal: FormModals;
        capturedUnsavedChangesEvent?: Event | undefined;
    };
    setCapturedUnsavedChangesEvent: (state: FormReducerState, capturedUnsavedChangesEvent: Event) => {
        capturedUnsavedChangesEvent: Event;
        activeModal: FormModals;
        shouldCheckForUnsavedChanges: boolean;
    };
};
export declare const formReducer: (state: FormReducerState, action: FormReducerAction) => FormReducerState;
export {};
