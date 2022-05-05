import React, { AnimationEvent, FC, useEffect, useState, ChangeEvent } from 'react';
import classNames from 'classnames';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Autocomplete, {
  AutocompleteChangeReason as MuiAutocompleteChangeReason,
  AutocompleteChangeDetails,
  AutocompleteProps,
  AutocompleteRenderGetTagProps
} from '@mui/material/Autocomplete';
import { FilterOptionsState } from '@mui/material/useAutocomplete';
import _isEqual from 'lodash/isEqual';
import _get from 'lodash/get';
import _set from 'lodash/set';

import { InputText } from '../InputText/InputText';
import { Icon } from '../../icon/Icon';
import { InputProps } from '../InputBase';
import { useFormContext } from '../../hooks';
import { lowercaseString } from '../../util/js-helpers';

import './input-select.css';

export type AutocompleteChangeReason = MuiAutocompleteChangeReason | 'autoFill';

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
  const formContext = useFormContext();
  if (!props.formikProps && formContext) props.formikProps = formContext;

  const allowCustomValue = autocompleteConfig?.freeSolo || allowCreateOption;
  const isMultiselect = autocompleteConfig?.multiple;

  const [isAutoFilling, setAutoFilling] = useState<boolean>(false);

  const optionMatchesValue = (option: any, value: any) => {
    // Note: Sometimes we pass in the value as true value and sometimes value is the selected option.
    return optionValueKey ? _get(option, optionValueKey) === value || _isEqual(option, value) : _isEqual(option, value);
  };

  const optionMatchesValueOrLabel = (option: any, value: any) => {
    const optionLabel = _get(option, optionLabelKey) || '';
    const optionValue = option && optionValueKey ? _get(option, optionValueKey) : option;
    const inputValue = lowercaseString(value);

    let valueMatch = false;
    const labelMatch = lowercaseString(optionLabel).includes(inputValue);

    if (!disableFilterOptionsByValue && (typeof optionValue === 'string' || typeof optionValue === 'number')) {
      valueMatch = lowercaseString(optionValue).includes(inputValue);
    }

    return valueMatch || labelMatch;
  };

  const findOptionByValue = (value: any) => options.find(option => optionMatchesValue(option, value));

  const findOptionByValueOrLabel = (value: any) => options.find(option => optionMatchesValueOrLabel(option, value));

  const getControlledValue = () => {
    const valueFromProps = props.formikProps ? _get(props.formikProps.values, name) : props.value;
    const selectedOption = findOptionByValue(valueFromProps);

    const defaultValue = isMultiselect ? [] : null;

    if (isMultiselect || (!selectedOption && allowCustomValue)) {
      return valueFromProps || defaultValue;
    }

    return selectedOption || defaultValue;
  };

  const getNormalizedValueSingle = (newValue: any) => {
    let isCustomValue = false;
    let normalizedValue = newValue;

    const selectedOption = findOptionByValue(newValue);

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
    options.filter(option => optionMatchesValueOrLabel(option, params.inputValue));

  const controlledValue = getControlledValue();

  const [value, setValue] = useState(controlledValue);

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: any,
    reason: AutocompleteChangeReason | 'autoFill',
    details?: any
  ) => {
    const normalizedValue = getNormalizedValue(newValue);

    const hasSafeName = props.formikProps?.status?.formConfig?.safeName || props.inputConfig?.safeName;

    // We only want to set the value here if it is not controlled from the outside.
    // Controlled values are handled in the `useEffect` below.
    if (!props.formikProps) setValue(normalizedValue);

    if (props.formikProps?.setFieldValue)
      props.formikProps.setFieldValue(hasSafeName ? `['${name}']` : name, normalizedValue);

    if (typeof onChange === 'function') onChange(event, normalizedValue, reason, details);
  };

  // Note: This function only exists to handle auto-filling right now.
  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const selectedOption = event.target.value ? findOptionByValueOrLabel(event.target.value) : null;

    if (props.inputProps?.autoComplete !== 'off' && selectedOption && isAutoFilling)
      handleChange(event, selectedOption, 'autoFill');
  };

  // Note: We had to use a `useEffect` here to handle cases where the form is reset or manipulated outside of the input
  // For some reason setting the initialInputValue in the initial useState did not reset the input on a form reset
  useEffect(() => {
    setValue(controlledValue);
  }, [controlledValue]);

  const autocompleteDefaultProps: AutocompleteProps<any, boolean, boolean, boolean> = {
    options,
    value,
    onChange: handleChange,
    openOnFocus: true,
    clearIcon: <Icon className="lc-input-select-icon-close" name="close" />,
    popupIcon: <Icon className="lc-input-select-icon-popup" name="chevronDown" />,
    renderInput: params => {
      // Note: To enable auto-filling, pass anything other than `autoComplete: 'off'` in the `inputProps` when configuring the component.
      const inputProps = {
        autoComplete: 'off',
        ...params.inputProps,
        ...props.inputProps
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
          // Important: Prevent `InputBase` from calling `formikProps.handleChange` because it is overriding
          // our change event and preventing the creation of custom options.
          formikProps={{ ...props.formikProps, handleChange: undefined }}
          onChange={handleInputChange}
          // Note: We need to manually handle the browser auto-fill event by listening for 'animationstart' and handling it based on the
          // animation name. This is because there is currently no native way to listen explicitly for auto-fill events.
          // See the following links for reference:
          // - https://codedaily.io/tutorials/Animated-Input-Label-with-Chrome-Autofill-Detection-in-React
          // - https://medium.com/@brunn/detecting-autofilled-fields-in-javascript-aed598d25da7
          // - https://gist.github.com/jonathantneal/d462fc2bf761a10c9fca60eb634f6977
          onAnimationStart={({ animationName }: AnimationEvent<HTMLInputElement>) => {
            if (animationName === 'mui-auto-fill') return setAutoFilling(true);
          }}
          // Important: We need to manually reset the `isAutoFilling` state. Doing it inside the `handleChange`
          // function proved ineffective because of a race condition with the `animationstart` event listener
          // on the input. Now, every time a user manually clicks on the input, it will reset the state.
          onMouseDown={() => setAutoFilling(false)}
        />
      );
    },
    // Note: We hide the popup when the browser is auto-filling because it blocks other elements.
    // @ts-ignore
    PaperComponent: props => (!isAutoFilling ? <Paper className="lc-input-select-paper" {...props} /> : null),
    getOptionLabel: (option: { [key: string]: any }) => _get(option, optionLabelKey) || '',
    getOptionDisabled: option => option.isDisabled,
    filterOptions,
    disableClearable: true,
    autoHighlight: false,
    autoSelect: false,
    autoComplete: true,
    isOptionEqualToValue: optionMatchesValue,
    renderTags: (valueArray: any[], getTagProps: AutocompleteRenderGetTagProps) => (
      <>
        {valueArray.map((valueArrayItem, index) => {
          const selectedOption = findOptionByValue(valueArrayItem);
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
