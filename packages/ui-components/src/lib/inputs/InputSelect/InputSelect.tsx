import React, { FC, useEffect, useState, ChangeEvent } from 'react';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Autocomplete, {
  AutocompleteChangeReason,
  AutocompleteChangeDetails,
  AutocompleteProps,
  AutocompleteRenderGetTagProps,
  createFilterOptions
} from '@mui/material/Autocomplete';
import { FilterOptionsState } from '@mui/material/useAutocomplete';

import classNames from 'classnames';
import { InputText } from '../InputText/InputText';
import { Icon } from '../../icon/Icon';
import { InputProps } from '../InputBase';
import { isEqual as _isEqual, get as _get, set as _set } from 'lodash';

import './input-select.css';

export type AutoCompleteChange = (
  event: ChangeEvent<any>,
  value: any,
  reason: AutocompleteChangeReason,
  details?: AutocompleteChangeDetails<any> | undefined
) => void;

export type InputSelectProps = Omit<InputProps, 'onChange'> & {
  value?: any;
  options: any[];
  optionLabelKey?: string;
  optionValueKey?: string;
  autocompleteConfig?: Partial<AutocompleteProps<any, boolean, boolean, boolean>>;
  allowCreateOption?: boolean;
  disableFilterOptionsByValue?: boolean;
  onChange?: AutoCompleteChange;
};

export const InputSelect: FC<InputSelectProps> = ({
  options,
  optionLabelKey = 'label',
  optionValueKey,
  name,
  className,
  autocompleteConfig,
  onChange,
  allowCreateOption,
  disableFilterOptionsByValue,
  ...props
}) => {
  const allowCustomValue = autocompleteConfig?.freeSolo || allowCreateOption;
  const isMultiselect = autocompleteConfig?.multiple;

  const optionAndValueAreEqual = (option: any, value: any) => {
    // Note: Sometimes we pass in the value as true value and sometimes value is the selected option.
    return optionValueKey ? _get(option, optionValueKey) === value || _isEqual(option, value) : _isEqual(option, value);
  };

  const getControlledValue = () => {
    const valueFromProps = props.formikProps ? _get(props.formikProps.values, name) : props.value;
    const selectedOption = options.find(option => optionAndValueAreEqual(option, valueFromProps));

    const defaultValue = isMultiselect ? [] : null;

    if (isMultiselect || (!selectedOption && allowCustomValue)) {
      return valueFromProps || defaultValue;
    }

    return selectedOption || defaultValue;
  };

  const getNormalizedValueSingle = (newValue: any) => {
    let isCustomValue = false;
    let normalizedValue = newValue;

    const selectedOption = options.find(option => optionAndValueAreEqual(option, newValue));

    // Check to see if we have a matching option.
    if (selectedOption) {
      return optionValueKey ? _get(selectedOption, optionValueKey) : selectedOption;
    }

    if (typeof newValue === 'string') {
      isCustomValue = true;
      normalizedValue = _set({}, optionLabelKey, newValue);
    } else if (newValue && newValue.inputValue) {
      isCustomValue = true;
      // Create a new value from the user input
      normalizedValue = _set({}, optionLabelKey, newValue.inputValue);
    }

    if (isCustomValue) {
      normalizedValue = _set(normalizedValue, optionValueKey || 'value', newValue.inputValue || newValue);
    }

    return optionValueKey && normalizedValue ? _get(normalizedValue, optionValueKey) : normalizedValue;
  };

  const getNormalizedValueMultiple = (newValues: any[]) =>
    newValues.map(newValue => getNormalizedValueSingle(newValue));

  const getNormalizedValue = (newValue: any) =>
    isMultiselect ? getNormalizedValueMultiple(newValue) : getNormalizedValueSingle(newValue);

  const filterOptions = createFilterOptions<any>();

  const controlledValue = getControlledValue();

  const [value, setValue] = useState(controlledValue);

  // Note: We had to use a `useEffect` here to handle cases where the form is reset or manipulated outside of the input
  // For some reason setting the initialInputValue in the initial useState did not reset the input on a form reset
  useEffect(() => {
    setValue(controlledValue);
  }, [controlledValue]);

  const autocompleteDefaultProps: AutocompleteProps<any, boolean, boolean, boolean> = {
    options,
    value,
    onChange: (event, newValue, reason, details) => {
      const normalizedValue = getNormalizedValue(newValue);

      setValue(normalizedValue);

      const hasSafeName = props.formikProps?.status?.formConfig?.safeName || props.inputConfig?.safeName;
      if (props.formikProps?.setFieldValue)
        props.formikProps.setFieldValue(hasSafeName ? `['${name}']` : name, normalizedValue);
      if (typeof onChange === 'function') onChange(event, normalizedValue, reason, details);
    },
    openOnFocus: true,
    clearIcon: <Icon className="lc-input-select-icon-close" name="close" />,
    popupIcon: <Icon className="lc-input-select-icon-popup" name="chevronDown" />,
    renderInput: params => {
      const inputProps = {
        ...params.inputProps,
        ...props.inputProps,
        disabled: props.disabled
      };

      const inputLabelProps = {
        ...params.InputLabelProps,
        ...props.InputLabelProps
      };

      return (
        <InputText
          name={name}
          {...params}
          {...props}
          inputProps={inputProps}
          InputLabelProps={inputLabelProps}
          // Prevent InputBase from calling `formikProps.handleChange`
          // Because it is overriding our change event and preventing
          // the creation of custom options
          formikProps={{ ...props.formikProps, handleChange: undefined }}
        />
      );
    },
    PaperComponent: props => <Paper className="lc-input-select-paper" {...props} />,
    getOptionLabel: (option: { [key: string]: any }) => _get(option, optionLabelKey) || '',
    getOptionDisabled: option => option.isDisabled,
    filterOptions,
    disableClearable: true,
    autoHighlight: false,
    autoSelect: false,
    autoComplete: true,
    isOptionEqualToValue: optionAndValueAreEqual,
    renderTags: (valueArray: any[], getTagProps: AutocompleteRenderGetTagProps) => (
      <>
        {valueArray.map((valueArrayItem, index) => {
          const selectedOption = options.find(option => optionAndValueAreEqual(option, valueArrayItem));
          const label = selectedOption
            ? _get(selectedOption, optionLabelKey)
            : _get(valueArrayItem, optionLabelKey) || valueArrayItem;
          return <Chip {...getTagProps({ index })} deleteIcon={<Icon name="close" />} label={label} />;
        })}
      </>
    )
  };

  const autocompleteFreeSoloProps = {
    disableClearable: false,
    autoHighlight: false,
    autoSelect: false,
    getOptionLabel: (option: any) => {
      // Value selected with enter, right from the input
      if (typeof option === 'string' || typeof option === 'number') {
        return option;
      }
      // Add "xxx" option created dynamically
      if (option.inputValue) {
        return option.inputValue;
      }
      // Regular option
      return _get(option, optionLabelKey);
    }
  };

  const autocompleteCreateOptionProps = {
    ...autocompleteFreeSoloProps,
    filterOptions: (options: any[], params: FilterOptionsState<any>) => {
      const filteredOptions = filterOptions(options, params);

      const { inputValue } = params;
      const isExisting = options.some(option => inputValue === option.title);

      // Suggest the creation of a new value
      if (inputValue !== '' && !isExisting) {
        filteredOptions.unshift(
          _set({ [optionValueKey || 'value']: inputValue }, optionLabelKey, `Use "${params.inputValue}"`)
        );
      }

      return filteredOptions;
    },
    selectOnFocus: true,
    clearOnBlur: true,
    handleHomeEndKeys: true
  };

  const autocompleteProps = {
    ...autocompleteDefaultProps,
    ...(autocompleteConfig?.freeSolo ? autocompleteFreeSoloProps : {}),
    ...(allowCreateOption ? autocompleteCreateOptionProps : {}),
    ...autocompleteConfig
  };

  return <Autocomplete className={classNames('lc-input-select', className)} {...autocompleteProps} />;
};
