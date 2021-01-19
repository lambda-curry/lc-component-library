import React, { useEffect, useState } from 'react';
import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteGetTagProps,
  AutocompleteProps,
  createFilterOptions,
  FilterOptionsState
} from '@material-ui/lab';
import { Paper, Chip } from '@material-ui/core';
import classNames from 'classnames';
import { InputText, Icon } from '../..';
import { InputProps } from '../InputBase';
import { isEqual as _isEqual, get as _get, set as _set } from 'lodash';

import './input-select.scss';
import { lowercaseString } from '../../util/js-helpers';

export type AutoCompleteChange = (
  event: React.ChangeEvent<{}>,
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

export const InputSelect: React.FC<InputSelectProps> = ({
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

  const getOptionSelected = (option: any, value: any) => {
    return optionAndValueAreEqual(option, value);
  };

  const getControlledValue = () => {
    const valueFromProps = props.formikProps ? _get(props.formikProps.values, name) : props.value;
    const selectedOption = options.find(option => getOptionSelected(option, valueFromProps));

    const defaultValue = isMultiselect ? [] : null;

    if (isMultiselect || (!selectedOption && allowCustomValue)) {
      return valueFromProps || defaultValue;
    }

    return selectedOption || defaultValue;
  };

  const getNormalizedValueSingle = (newValue: any) => {
    let isCustomValue = false;
    let normalizedValue = newValue;

    const selectedOption = options.find(option => getOptionSelected(option, newValue));

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

  const filterOptions = (options: any[], params: FilterOptionsState<any>) =>
    options.filter(option => {
      const optionLabel = _get(option, optionLabelKey) || '';
      const optionValue = option && optionValueKey ? _get(option, optionValueKey) : option;
      const inputValue = lowercaseString(params.inputValue);

      let valueMatch = false;
      let labelMatch = lowercaseString(optionLabel).includes(inputValue);

      if (!disableFilterOptionsByValue && (typeof optionValue === 'string' || typeof optionValue === 'number')) {
        valueMatch = lowercaseString(optionValue).includes(inputValue);
      }

      return valueMatch || labelMatch;
    });

  const controlledValue = getControlledValue();

  const [value, setValue] = useState(controlledValue);

  // Note: We had to use a `useEffect` here to handle cases where the form is reset or manipulated outside of the input
  // For some reason setting the initialInputValue in the initial useState did not reset the input on a form reset
  useEffect(() => {
    setValue(controlledValue);
  }, [props.value, props.formikProps?.values]);

  const autocompleteDefaultProps: AutocompleteProps<any, boolean, boolean, boolean> = {
    options,
    value,
    onChange: (event, newValue, reason, details) => {
      const normalizedValue = getNormalizedValue(newValue);

      setValue(normalizedValue);

      const hasSafeName = props.formikProps?.status?.formConfig?.safeName || props.inputConfig?.safeName;
      if (props.formikProps?.setFieldValue)
        props.formikProps.setFieldValue(hasSafeName ? `['${name}']` : name, normalizedValue);
      if (typeof onChange === 'function') onChange(event, newValue, reason, details);
    },
    openOnFocus: true,
    closeIcon: <Icon className="lc-input-select-icon-close" name="close" />,
    popupIcon: <Icon className="lc-input-select-icon-popup" name="chevronDown" />,
    renderInput: params => {
      const inputProps = {
        ...params.inputProps,
        ...props.inputProps
      };

      return (
        <InputText
          name={name}
          {...params}
          {...props}
          inputProps={inputProps}
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
    getOptionSelected,
    filterOptions,
    disableClearable: true,
    autoHighlight: !isMultiselect,
    autoSelect: !isMultiselect,
    autoComplete: true,
    renderTags: (valueArray: any[], getTagProps: AutocompleteGetTagProps) => (
      <>
        {valueArray.map((valueArrayItem, index) => {
          const selectedOption = options.find(option => getOptionSelected(option, valueArrayItem));
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

      // Suggest the creation of a new value
      if (params.inputValue !== '') {
        filteredOptions.unshift(_set({ inputValue: params.inputValue }, optionLabelKey, `Use "${params.inputValue}"`));
      }

      return filteredOptions;
    },
    selectOnFocus: true,
    clearOnBlur: true,
    handleHomeEndKeys: true,
    renderOption: (option: any) => _get(option, optionLabelKey)
  };

  const autocompleteProps = {
    ...autocompleteDefaultProps,
    ...(autocompleteConfig?.freeSolo ? autocompleteFreeSoloProps : {}),
    ...(allowCreateOption ? autocompleteCreateOptionProps : {}),
    ...autocompleteConfig
  };

  return <Autocomplete className={classNames('lc-input-select', className)} {...autocompleteProps} />;
};
