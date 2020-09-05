import React, { FunctionComponent } from 'react';
import { Autocomplete, AutocompleteProps } from '@material-ui/lab';
import { Paper } from '@material-ui/core';
import classNames from 'classnames';
import { InputText, Icon } from '../..';
import { InputProps } from '../InputBase';
import { isEqual } from 'lodash';

import './input-select.scss';
import { FormikProps } from 'formik';

type InputSelectProps = InputProps & {
  options: any[];
  optionLabelKey?: string;
  multiple?: boolean;
};

export const InputSelect: FunctionComponent<InputSelectProps> = ({
  options,
  optionLabelKey = 'label',
  multiple,
  name,
  className,
  formikProps,
  ...props
}) => {
  const autocompleteConfig: AutocompleteProps<any, boolean, boolean, boolean> = {
    options,
    multiple,
    value: (formikProps as FormikProps<any>).values[name],
    openOnFocus: true,
    closeIcon: <Icon className="input-select-icon-close" name="close" />,
    popupIcon: <Icon className="input-select-icon-popup" name="chevronDown" />,
    ChipProps: { deleteIcon: <Icon name="close" /> },
    renderInput: inputProps => (
      <InputText name={name} {...inputProps} {...props} formikProps={{ ...formikProps, handleChange: () => {} }} />
    ),
    PaperComponent: props => <Paper className="input-select-paper" {...props} />,
    getOptionLabel: (option: { [key: string]: any }) => option[optionLabelKey] || '',
    getOptionSelected: (option: any, value: any) => isEqual(option, value),
    onChange: (event: object, value: any) => formikProps.setFieldValue(name, value)
  };

  return <Autocomplete className={classNames('input-select', className)} {...autocompleteConfig} />;
};
