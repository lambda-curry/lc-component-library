import React, { useEffect, useState } from 'react';
import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteProps,
  createFilterOptions
} from '@material-ui/lab';
import { Paper } from '@material-ui/core';
import classNames from 'classnames';
import { InputText, Icon } from '../..';
import { InputProps } from '../InputBase';
import { isEqual as _isEqual, get as _get, set as _set } from 'lodash';

import './input-select.scss';

export type AutoCompleteChange = (
  event: React.ChangeEvent<{}>,
  value: any,
  reason: AutocompleteChangeReason,
  details?: AutocompleteChangeDetails<any> | undefined
) => void;

export type InputSelectProps = InputProps & {
  value?: { [x: string]: any };
  options: any[];
  optionLabelKey?: string;
  optionValueKey?: string;
  autocompleteConfig?: Partial<AutocompleteProps<any, boolean, boolean, boolean>>;
  allowCreateOption?: boolean;
  onChange?: AutoCompleteChange;
};

const filter = createFilterOptions();

export const InputSelect: React.FC<InputSelectProps> = ({
  options,
  optionLabelKey = 'label',
  optionValueKey,
  name,
  className,
  autocompleteConfig,
  onChange,
  allowCreateOption,
  ...props
}) => {
  const allowCustomOption = autocompleteConfig?.freeSolo || allowCreateOption;

  const getOptionSelected = (option: any, value: any) => {
    // Note: Sometimes we pass in the value as true value and sometimes value is the selected option.
    const selected = optionValueKey
      ? _get(option, optionValueKey) === value || _isEqual(option, value)
      : _isEqual(option, value);

    return selected;
  };

  const getControlledValue = () => {
    const valueFromProps = props.formikProps ? _get(props.formikProps?.values, name) : props.value;
    const selectedOption = options.find(option => getOptionSelected(option, valueFromProps));

    if (!selectedOption && allowCustomOption) {
      return valueFromProps || null;
    }

    return selectedOption || null;
  };

  const getNormalizedValue = (newValue: any) => {
    let isCustomValue = false;
    let normalizedValue = newValue;

    if (typeof newValue === 'string') {
      isCustomValue = true;
      normalizedValue = _set({}, optionLabelKey, newValue);
    } else if (newValue && newValue.inputValue) {
      isCustomValue = true;
      // Create a new value from the user input
      normalizedValue = _set({}, optionLabelKey, newValue.inputValue);
    }

    if (isCustomValue && optionValueKey) {
      normalizedValue = _set(normalizedValue, optionValueKey, newValue.inputValue);
    }

    return optionValueKey && normalizedValue ? _get(normalizedValue, optionValueKey) : normalizedValue;
  };

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
    multiple: false,
    onChange: (event, newValue, reason, details) => {
      const normalizedValue = getNormalizedValue(newValue);

      setValue(normalizedValue);

      if (props.formikProps?.handleChange) props.formikProps.handleChange(event);
      if (props.formikProps?.setFieldValue) props.formikProps.setFieldValue(name, normalizedValue);
      if (typeof onChange === 'function') onChange(event, newValue, reason, details);
    },
    openOnFocus: true,
    closeIcon: <Icon className="lc-input-select-icon-close" name="close" />,
    popupIcon: <Icon className="lc-input-select-icon-popup" name="chevronDown" />,
    ChipProps: { deleteIcon: <Icon name="close" /> },
    renderInput: params => {
      return (
        <>
          {!optionValueKey || props.formikProps ? (
            <InputText
              name={name}
              {...params}
              {...props}
              // Prevent InputBase from calling `formikProps.handleChange`
              // Because it is overriding our change event and preventing
              // the creation of custom options
              formikProps={{ ...props.formikProps, handleChange: undefined }}
            />
          ) : (
            <>
              <input
                name={name}
                type="hidden"
                value={props.value && optionValueKey ? _get(props.value, optionValueKey) : props.value}
              />
              <InputText name={`_${name}`} {...params} {...props} />
            </>
          )}
        </>
      );
    },
    PaperComponent: props => <Paper className="lc-input-select-paper" {...props} />,
    getOptionLabel: (option: { [key: string]: any }) => _get(option, optionLabelKey) || '',
    getOptionSelected,
    disableClearable: true,
    autoHighlight: true,
    autoSelect: true,
    autoComplete: true
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
    filterOptions: (options: any, params: any) => {
      const filteredOptions = filter(options, params);

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
