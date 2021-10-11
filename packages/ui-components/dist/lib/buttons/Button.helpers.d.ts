export interface ButtonReducerState {
    leftIcon: boolean;
    rightIcon: boolean;
}
export interface ButtonReducerAction {
    name: keyof typeof buttonReducers;
    payload?: any;
}
declare const buttonReducers: {
    setLeftIcon: (state: ButtonReducerState, leftIcon: boolean) => {
        leftIcon: boolean;
        rightIcon: boolean;
    };
    setRightIcon: (state: ButtonReducerState, rightIcon: boolean) => {
        rightIcon: boolean;
        leftIcon: boolean;
    };
};
export declare const buttonReducer: (state: ButtonReducerState, action: ButtonReducerAction) => ButtonReducerState;
export {};
