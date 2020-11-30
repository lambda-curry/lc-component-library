import React, { useEffect, useState } from 'react';
import { Autocomplete, AutocompleteChangeDetails, AutocompleteChangeReason, AutocompleteProps } from '@material-ui/lab';
import { Paper } from '@material-ui/core';
import classNames from 'classnames';
import { InputText, Icon } from '../..';
import { InputProps } from '../InputBase';
import { isEqual, get } from 'lodash';

import './input-select.scss';

export type AutoCompleteChange = (
  event: React.ChangeEvent<{}>,
  value: any,
  reason: AutocompleteChangeReason,
  details?: AutocompleteChangeDetails<any> | undefined
) => void;

export type InputSelectProps = Omit<InputProps, 'onChange'> & {
  value?: { [x: string]: any };
  options: any[];
  optionLabelKey?: string;
  optionValueKey?: string;
  autocompleteConfig?: Partial<AutocompleteProps<any, boolean, boolean, boolean>>;
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
  ...props
}) => {
  const getOptionSelected = (option: any, value: any) => {
    // Note: Sometimes we pass in the value as true value and sometimes value is the selected option.
    const selected = optionValueKey
      ? option[optionValueKey] === value || isEqual(option, value)
      : isEqual(option, value);
    if (selected) return selected;
  };

  const initialValue = props.formikProps ? get(props.formikProps?.values, name) : props.value;
  // Note: If no value is passed initialValue should be initialized as null instead of undefined to help with uncontrolled component warning
  // https://github.com/mui-org/material-ui/issues/18173#issuecomment-552420187

  const matchedOptionValue = options.find(option => getOptionSelected(option, initialValue));
  const initialInputValue = matchedOptionValue || initialValue || null;
  const [inputValue, setInputValue] = useState(initialInputValue);

  // Note: We had to use a `useEffect` here to handle cases where the form is reset or manipulated outside of the input
  // For some reason setting the initialInputValue in the initial useState did not reset the input on a form reset
  useEffect(() => {
    setInputValue(initialInputValue);
  }, [initialInputValue]);

  // Note: This uses the filterOptions to add the initial option for fields who have selected a custom input option
  if (initialInputValue && !matchedOptionValue && autocompleteConfig?.filterOptions && inputValue)
    options = autocompleteConfig.filterOptions(options, {
      inputValue,
      getOptionLabel: autocompleteConfig.getOptionLabel as (option: any) => string
    });

  const handleChange: (
    event: React.ChangeEvent<{}>,
    value: any,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<any> | undefined
  ) => void = (event, value, reason, details) => {
    setInputValue(value);
    const fieldValue = optionValueKey && value ? value[optionValueKey] : value;
    if (props.formikProps) props.formikProps.setFieldValue(name, fieldValue);
    if (typeof onChange === 'function') onChange(event, fieldValue, reason, details);
  };

  const autocompleteProps: AutocompleteProps<any, boolean, boolean, boolean> = {
    options,
    multiple: false,
    value: inputValue,
    openOnFocus: true,
    closeIcon: <Icon className="input-select-icon-close" name="close" />,
    popupIcon: <Icon className="input-select-icon-popup" name="chevronDown" />,
    ChipProps: { deleteIcon: <Icon name="close" /> },
    renderInput: params => {
      return (
        <>
          {!optionValueKey || props.formikProps ? (
            <InputText name={name} {...params} {...props} inputProps={{ ...params.inputProps, ...props.inputProps }} />
          ) : (
            <>
              <input name={name} type="hidden" value={props.value ? props.value[optionValueKey] : null} />
              <InputText
                name={`_${name}`}
                {...params}
                {...props}
                inputProps={{ ...params.inputProps, ...props.inputProps }}
              />
            </>
          )}
        </>
      );
    },
    PaperComponent: props => <Paper className="input-select-paper" {...props} />,
    getOptionSelected,
    getOptionLabel: (option: { [key: string]: any }) => get(option, optionLabelKey) || '',
    onChange: handleChange,
    ...autocompleteConfig
  };

  return <Autocomplete className={classNames('input-select', className)} {...autocompleteProps} />;
};
