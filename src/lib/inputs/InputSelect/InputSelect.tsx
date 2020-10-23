import React, { FunctionComponent } from 'react';
import { Autocomplete, AutocompleteChangeDetails, AutocompleteChangeReason, AutocompleteProps } from '@material-ui/lab';
import { Paper } from '@material-ui/core';
import classNames from 'classnames';
import { InputText, Icon } from '../..';
import { InputProps } from '../InputBase';
import { isEqual, get } from 'lodash';

import './input-select.scss';

export type InputSelectProps = InputProps & {
  options: any[];
  optionLabelKey?: string;
  autocompleteConfig: Partial<AutocompleteProps<any, boolean, boolean, boolean>>;
};

export const InputSelect: FunctionComponent<InputSelectProps> = ({
  options,
  optionLabelKey = 'label',
  name,
  className,
  autocompleteConfig,
  ...props
}) => {
  // Note: We want to remove the change event from the rendered component so it can be handled by the autocomplete
  if (props.formikProps) {
    props.formikProps.handleChange = () => {};
  }

  const handleChange: (
    event: React.ChangeEvent<{}>,
    value: any,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<any> | undefined
  ) => void = (event, value) => {
    if (props.formikProps) props.formikProps.setFieldValue(name, value);
    if (typeof props.onChange === 'function') props.onChange(event as React.ChangeEvent<HTMLInputElement>);
  };

  const autocompleteProps: AutocompleteProps<any, boolean, boolean, boolean> = {
    options,
    multiple: false,
    // Note: Value initialized as null instead of undefined to help with uncontrolled component warning
    // https://github.com/mui-org/material-ui/issues/18173#issuecomment-552420187
    value: props.formikProps ? props.formikProps.values[name] || null : props.value || null,
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
