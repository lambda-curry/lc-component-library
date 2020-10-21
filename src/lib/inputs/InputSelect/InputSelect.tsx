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
  disableClearable?: boolean;
  freeSolo?: boolean;
  openOnFocus?: boolean;
};

export const InputSelect: FunctionComponent<InputSelectProps> = ({
  options,
  optionLabelKey = 'label',
  multiple,
  disableClearable,
  freeSolo,
  openOnFocus = true,
  name,
  className,
  formikProps,
  ...props
}) => {
  const autocompleteConfig = {
      options,
      multiple,
      disableClearable,
      freeSolo,
      openOnFocus,
      value: formikProps?.values[name],
      closeIcon: <Icon className="input-select-icon-close" name="close" />,
      popupIcon: <Icon className="input-select-icon-popup" name="chevronDown" />,
      ChipProps: { deleteIcon: <Icon name="close" /> },
      renderInput: (inputProps: any) => (
          <InputText
              name={name}
              {...inputProps}
              {...props}
              formikProps={{ ...formikProps, handleChange: () => null }}
          />
      ),
      PaperComponent: (paperComponentProps: any) => (
          <Paper className="input-select-paper" {...paperComponentProps} />
      ),
      getOptionLabel: (option: { [key: string]: any }) => option[optionLabelKey] || '',
      getOptionSelected: (option: any, value: any) => isEqual(option, value),
      onChange: (event: object, value: any) => formikProps?.setFieldValue(name, value),
  };

  return <Autocomplete className={classNames('input-select', className)} {...autocompleteConfig} />;
};