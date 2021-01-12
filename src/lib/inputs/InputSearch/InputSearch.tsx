import React, { Reducer, useEffect, useReducer } from 'react';
import classNames from 'classnames';
import { AutoCompleteChange, InputSelect, InputSelectProps } from '../InputSelect/InputSelect';
import { useAsyncEffect, useDebounce } from '../../hooks';
import {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteInputChangeReason,
  AutocompleteProps
} from '@material-ui/lab';
import { InputProps } from '../InputBase';

export interface InputSearchReducerState {
  status?: ServerRequestStatus;
  options: any[];
  inputSearchValue: string;
}

export interface InputSearchOptions {
  ingoreFalseyInputValues: boolean;
  debounceTime: number;
}

export type ServerRequestStatus = 'waiting' | 'sending' | 'sent' | 'error';

export interface InputSearchReducerAction {
  name: keyof typeof inputSearchReducers;
  payload?: any;
}

const inputSearchReducers = {
  setStatus: (state: InputSearchReducerState, status: ServerRequestStatus) => ({ ...state, status }),
  setOptions: (state: InputSearchReducerState, options: any[]) => ({ ...state, options }),
  setInputSearchValue: (state: InputSearchReducerState, inputSearchValue: string) => ({ ...state, inputSearchValue })
};

export const inputSearchReducer = (state: InputSearchReducerState, action: InputSearchReducerAction) => {
  if (!inputSearchReducers[action.name]) {
    throw new Error(`reducer ${action.name} not defined`);
  }
  const nextState: InputSearchReducerState = inputSearchReducers[action.name](state, action.payload);
  return nextState;
};

type InputSearchProps = InputSelectProps & {
  url: string;
  searchParam?: string;
  searchOptions?: InputSearchOptions;
  getOptions?: (data: any) => any;
};

export const InputSearch: React.FC<InputSearchProps> = ({
  className,
  url,
  searchParam,
  searchOptions,
  getOptions = options => options,
  ...props
}) => {
  const options = {
    ingoreFalseyInputValues: true,
    debounceTime: 200,
    ...searchOptions
  };

  const [state, dispatch] = useReducer<Reducer<InputSearchReducerState, InputSearchReducerAction>>(inputSearchReducer, {
    status: 'waiting',
    options: [],
    inputSearchValue: ''
  });

  const searchTerm = useDebounce(state.inputSearchValue, options.debounceTime);
  const search = async () => {
    if (options.ingoreFalseyInputValues && !state.inputSearchValue) return;
    const [base, params] = url.split('?');
    const searchParams = new URLSearchParams(params);
    if (searchParam) searchParams.set(searchParam, searchTerm);
    const searchUrl = `${base}?${searchParams.toString()}`;
    const response = await fetch(searchUrl);
    const jsonData = await response.json();

    dispatch({ name: 'setOptions', payload: getOptions(jsonData) });
  };

  useAsyncEffect(search, undefined, [url, searchTerm]);

  const handleChange: AutoCompleteChange = (event, value, reason, details) => {
    if (props.formikProps?.setFieldValue) props.formikProps.setFieldValue(props.name, value);
    if (typeof props.onChange === 'function')
      props.onChange(event as React.ChangeEvent<HTMLInputElement>, value, reason, details);
  };

  const handleInputChange: (
    event: React.ChangeEvent<{}>,
    value: string,
    reason: AutocompleteInputChangeReason
  ) => void = (event, value, reason) => {
    if (reason !== 'input' || value === '') return;
    dispatch({ name: 'setInputSearchValue', payload: value });
  };

  return (
    <InputSelect
      className={classNames('lc-input-search', className)}
      {...props}
      options={state.options}
      onChange={handleChange}
      autocompleteConfig={{
        loading: state.options.length < 1,
        onInputChange: handleInputChange,
        ...props.autocompleteConfig
      }}
    />
  );
};
