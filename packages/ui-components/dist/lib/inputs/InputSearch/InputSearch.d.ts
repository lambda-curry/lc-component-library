import { FC } from 'react';
import { InputSelectProps } from '../InputSelect/InputSelect';
export interface InputSearchReducerState {
    status?: ServerRequestStatus;
    options: any[];
    inputSearchValue: string;
}
export interface InputSearchOptions {
    ignoreFalseyInputValues?: boolean;
    debounceTime?: number;
    initialSearchValue?: string;
    loading?: (response: any) => boolean;
}
export declare type ServerRequestStatus = 'waiting' | 'sending' | 'sent' | 'error';
export interface InputSearchReducerAction {
    name: keyof typeof inputSearchReducers;
    payload?: any;
}
declare const inputSearchReducers: {
    setStatus: (state: InputSearchReducerState, status: ServerRequestStatus) => {
        status: ServerRequestStatus;
        options: any[];
        inputSearchValue: string;
    };
    setOptions: (state: InputSearchReducerState, options: any[]) => {
        options: any[];
        status?: ServerRequestStatus | undefined;
        inputSearchValue: string;
    };
    setInputSearchValue: (state: InputSearchReducerState, inputSearchValue: string) => {
        inputSearchValue: string;
        status?: ServerRequestStatus | undefined;
        options: any[];
    };
};
export declare const inputSearchReducer: (state: InputSearchReducerState, action: InputSearchReducerAction) => InputSearchReducerState;
declare type InputSearchProps = Omit<InputSelectProps, 'options'> & {
    url: string;
    searchParam?: string;
    searchOptions?: InputSearchOptions;
    getOptions?: (data: any) => any[];
};
export declare const InputSearch: FC<InputSearchProps>;
export {};
