import React, { useState } from 'react';
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
  options: any[];
  optionLabelKey?: string;
  autocompleteConfig?: Partial<AutocompleteProps<any, boolean, boolean, boolean>>;
  onChange?: AutoCompleteChange;
};

export const InputSelect: React.FC<InputSelectProps> = ({
  options,
  optionLabelKey = 'label',
  name,
  className,
  autocompleteConfig,
  onChange,
  ...props
}) => {
  const [inputValue, setInputValue] = useState(props.formikProps?.values[name] || props.value || null);

  // Note: We want to remove the change event from the rendered component so it can be handled by the autocomplete
  if (props.formikProps) {
    props.formikProps.handleChange = () => {};
  }

  const handleChange: (
    event: React.ChangeEvent<{}>,
    value: any,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<any> | undefined
  ) => void = (event, value, reason, details) => {
    setInputValue(value);
    if (props.formikProps) props.formikProps.setFieldValue(name, value);
    if (typeof onChange === 'function') onChange(event, value, reason, details);
  };

  const autocompleteProps: AutocompleteProps<any, boolean, boolean, boolean> = {
    options,
    multiple: false,
    // Note: Value initialized as null instead of undefined to help with uncontrolled component warning
    // https://github.com/mui-org/material-ui/issues/18173#issuecomment-552420187
    value: inputValue,
    openOnFocus: true,
    closeIcon: <Icon className="input-select-icon-close" name="close" />,
    popupIcon: <Icon className="input-select-icon-popup" name="chevronDown" />,
    ChipProps: { deleteIcon: <Icon name="close" /> },
    renderInput: inputProps => <InputText name={name} {...inputProps} {...props} />,
    PaperComponent: props => <Paper className="input-select-paper" {...props} />,
    getOptionSelected: (option: any, value: any) => isEqual(option, value),
    getOptionLabel: (option: { [key: string]: any }) => get(option, optionLabelKey) || '',
    onChange: handleChange,
    ...autocompleteConfig
  };

  return <Autocomplete className={classNames('input-select', className)} {...autocompleteProps} />;
};
