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

type InputSearchProps = InputProps & {
  url: string;
  searchParam?: string;
  getOptions: (data: any) => any;
  optionLabelKey?: string;
  autocompleteConfig?: Partial<AutocompleteProps<any, boolean, boolean, boolean>>;
  onChange?: AutoCompleteChange;
};

export const InputSearch: React.FC<InputSearchProps> = ({
  className,
  url,
  searchParam,
  getOptions = options => options,
  ...props
}) => {
  const [state, dispatch] = useReducer<Reducer<InputSearchReducerState, InputSearchReducerAction>>(inputSearchReducer, {
    status: 'waiting',
    options: [],
    inputSearchValue: ''
  });

  const searchTerm = useDebounce(state.inputSearchValue, 200);
  const search = async () => {
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
    if (props.formikProps) props.formikProps.setFieldValue(props.name, value);
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
