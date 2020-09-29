import React from 'react';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import { FormikProps } from 'formik';
import classNames from 'classnames';
import { get as _get } from 'lodash';

import './input.scss';
import { InputAdornment } from '@material-ui/core';

export type InputProps = TextFieldProps & {
  name: string;
  prefix?: JSX.Element;
  suffix?: JSX.Element;
  formikProps: FormikProps<any>;
};

export const InputBase = ({ name, className, formikProps, prefix, suffix, ...props }: InputProps) => {
  const fieldError =
    formikProps.errors && name && _get(formikProps.touched, name) ? _get(formikProps.errors, name) : '';

  const fieldValue = _get(formikProps.values, name);

  const inputProps = {
    startAdornment: prefix ? <InputAdornment position="start">{prefix}</InputAdornment> : false,
    endAdornment: suffix ? <InputAdornment position="end">{suffix}</InputAdornment> : false
  };

  return (
    <TextField
      name={name}
      error={!!fieldError}
      helperText={fieldError}
      size="small"
      className={classNames(className, 'input')}
      // Note: `as any` needed to help with expected types for the variant prop from Material UI
      variant={'outlined' as any}
      InputProps={inputProps}
      value={fieldValue}
      onChange={formikProps.handleChange}
      onBlur={formikProps.handleBlur}
      {...props}
    />
  );
};
