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
  ignoreFalseyInputValues?: boolean;
  debounceTime?: number;
  initialSearchValue?: string;
  loading?: (response: any) => boolean;
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
  const selectedValue = _get(props.formikProps?.values, props.name);
  const getValueLabel: (value: any, options: any[]) => string = (value, options) => {
    if (!options) return '';

    if (props.optionValueKey && options.length) {
      const foundOption = options.find(option => option[props.optionValueKey as string] === value);
      return foundOption ? foundOption[optionLabelKey] : '';
    }

    const valueLabel = typeof selectedValue === 'string' ? value : _get(value, optionLabelKey);
    return typeof valueLabel === 'string' ? valueLabel : '';
  };

  const [state, dispatch] = useReducer<Reducer<InputSearchReducerState, InputSearchReducerAction>>(inputSearchReducer, {
    status: 'waiting',
    options: selectedValue ? [selectedValue] : [],
    inputSearchValue: getValueLabel(selectedValue, selectedValue ? [selectedValue] : [])
  });

  const config: InputSearchOptions = {
    ignoreFalseyInputValues: true,
    ...searchOptions
  };

  const initialSearchInputValue = config.initialSearchValue ?? getValueLabel(selectedValue, state.options);

  // Run an initial search if an initialSearchValue is given
  useEffect(() => {
    if (config.initialSearchValue !== undefined)
      dispatch({ name: 'setInputSearchValue', payload: config.initialSearchValue });
  }, [config.initialSearchValue]);

  // Trigger input value change if formik value is changed from outside the input
  useEffect(() => {
    if (initialSearchInputValue === '') dispatch({ name: 'setInputSearchValue', payload: initialSearchInputValue });
  }, [initialSearchInputValue]);

  const searchTerm = useDebounce(state.inputSearchValue, config.debounceTime || 200);
  const search = async () => {
    // If the input value equals, we probably do not need to run another search - Jake 05/06/2021
    if (!!searchTerm && searchTerm === getValueLabel(selectedValue, state.options)) return;
    if (
      config.ignoreFalseyInputValues &&
      (config.initialSearchValue === undefined || config.initialSearchValue === null) &&
      (state.inputSearchValue === undefined || state.inputSearchValue === null)
    )
      return;

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
      config.initialSearchValue &&
      !selectOptions.some(
        (selectOption: any) => _get(selectedValue, optionLabelKey) === _get(selectOption, optionLabelKey)
      )
    )
      selectOptions.unshift(selectedValue);

    dispatch({ name: 'setOptions', payload: selectOptions });
  };

  useAsyncEffect(search, undefined, [url, searchTerm]);

  const handleChange: AutoCompleteChange = (event, value, reason, details) => {
    if (props.formikProps?.handleChange) props.formikProps.handleChange(event);
    if (typeof props.onChange === 'function')
      props.onChange(event as ChangeEvent<HTMLInputElement>, value, reason, details);

    const valueLabel = getValueLabel(value, state.options);
    if (valueLabel) dispatch({ name: 'setInputSearchValue', payload: valueLabel });
  };

  const handleInputChange: (
    event: ChangeEvent<any>,
    inputValue: string,
    reason: AutocompleteInputChangeReason
  ) => void = (event, inputValue, reason) => {
    // Note: we don't want to reset the input to empty if there is an input value in place
    if (state.inputSearchValue && inputValue === '' && reason === 'reset') return;
    if (!event && reason !== 'clear' && reason !== 'input') return;
    dispatch({ name: 'setInputSearchValue', payload: inputValue });
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
        inputValue: state.inputSearchValue,
        disableClearable: false,
        loading: config.loading ? config.loading(state.options) : state.options.length < 1,
        onInputChange: handleInputChange,
        ...props.autocompleteConfig
      }}
    />
  );
};
