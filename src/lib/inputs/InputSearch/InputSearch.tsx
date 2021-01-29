import React, { FC, Reducer, useEffect, useReducer, ChangeEvent } from 'react';
import classNames from 'classnames';
import { AutoCompleteChange, InputSelect, InputSelectProps } from '../InputSelect/InputSelect';
import { useAsyncEffect, useDebounce } from '../../hooks';
import { AutocompleteInputChangeReason } from '@material-ui/lab';
import { get as _get } from 'lodash';

export interface InputSearchReducerState {
  status?: ServerRequestStatus;
  options: any[];
  inputSearchValue: string;
}

export interface InputSearchOptions {
  ingoreFalseyInputValues?: boolean;
  debounceTime?: number;
  initialSearchValue?: string;
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

export const inputSearchReducer = (
  state: InputSearchReducerState,
  action: InputSearchReducerAction
): InputSearchReducerState => {
  if (!inputSearchReducers[action.name]) {
    throw new Error(`reducer ${action.name} not defined`);
  }
  const nextState: InputSearchReducerState = inputSearchReducers[action.name](state, action.payload);
  return nextState;
};

type InputSearchProps = Omit<InputSelectProps, 'options'> & {
  url: string;
  searchParam?: string;
  searchOptions?: InputSearchOptions;
  getOptions?: (data: any) => any[];
};

export const InputSearch: FC<InputSearchProps> = ({
  className,
  url,
  searchParam,
  searchOptions,
  optionLabelKey = 'label',
  getOptions = (options: any[]) => options,
  placeholder = 'Type to search...',
  ...props
}) => {
  const options = {
    ingoreFalseyInputValues: true,
    debounceTime: 200,
    ...searchOptions
  };

  const selectedValue = _get(props.formikProps?.values, props.name);

  const [state, dispatch] = useReducer<Reducer<InputSearchReducerState, InputSearchReducerAction>>(inputSearchReducer, {
    status: 'waiting',
    options: selectedValue ? [selectedValue] : [],
    inputSearchValue: ''
  });

  // Run an initial search
  useEffect(() => {
    if (options.initialSearchValue) dispatch({ name: 'setInputSearchValue', payload: options.initialSearchValue });
  }, [options.initialSearchValue]);

  const searchTerm = useDebounce(state.inputSearchValue, options.debounceTime);
  const search = async () => {
    if (!options.initialSearchValue && options.ingoreFalseyInputValues && !state.inputSearchValue) return;
    const [base, params] = url.split('?');
    const searchParams = new URLSearchParams(params);
    if (searchParam) searchParams.set(searchParam, searchTerm);
    const searchUrl = `${base}?${searchParams.toString()}`;
    const response = await fetch(searchUrl);
    const jsonData = await response.json();
    const selectOptions = getOptions(jsonData);

    // Add Selected value as the first option if an initial search term is provided to always provide the search value
    if (
      selectedValue &&
      options.initialSearchValue &&
      !selectOptions.some(
        (selectOption: any) => _get(selectedValue, optionLabelKey) === _get(selectOption, optionLabelKey)
      )
    )
      selectOptions.unshift(selectedValue);

    dispatch({ name: 'setOptions', payload: selectOptions });
  };

  useAsyncEffect(search, undefined, [url, searchTerm]);

  const handleChange: AutoCompleteChange = (event, value, reason, details) => {
    if (props.formikProps?.setFieldValue) props.formikProps.setFieldValue(props.name, value);
    if (typeof props.onChange === 'function')
      props.onChange(event as ChangeEvent<HTMLInputElement>, value, reason, details);
  };

  const handleInputChange: (event: ChangeEvent<any>, value: string, reason: AutocompleteInputChangeReason) => void = (
    event,
    value,
    reason
  ) => {
    if (reason !== 'input' || value === '') return;
    dispatch({ name: 'setInputSearchValue', payload: value });
  };

  return (
    <InputSelect
      className={classNames('lc-input-search', className)}
      placeholder={placeholder}
      optionLabelKey={optionLabelKey}
      {...props}
      options={state.options}
      onChange={handleChange}
      autocompleteConfig={{
        disableClearable: false,
        loading: state.options.length < 1,
        onInputChange: handleInputChange,
        ...props.autocompleteConfig
      }}
    />
  );
};
