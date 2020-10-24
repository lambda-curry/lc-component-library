import React, { ChangeEvent, FocusEvent } from 'react';
import TextField, { OutlinedTextFieldProps, TextFieldProps } from '@material-ui/core/TextField';
import { FormikProps } from 'formik';
import classNames from 'classnames';
import { get as _get } from 'lodash';

import './input.scss';
import { InputAdornment } from '@material-ui/core';

type LabelPlacements = 'inset' | 'above';

export type InputProps = OutlinedTextFieldProps & {
  name: string;
  prefix?: JSX.Element;
  suffix?: JSX.Element;
  formikProps?: FormikProps<any>;
  labelPlacement?: LabelPlacements;
  variant?: 'outlined'; // Don't remove any typing because this breaks the build. - Jake
};

export const InputBase = ({
  name,
  id,
  className,
  formikProps,
  prefix,
  suffix,
  label,
  labelPlacement = 'inset',
  variant = 'outlined',
  ...props
}: InputProps) => {
  const fieldError =
    formikProps?.errors && name && _get(formikProps.touched, name) ? _get(formikProps.errors, name) : '';

  const fieldValue = _get(formikProps?.values, name);

  const inputProps = {
    startAdornment: prefix ? <InputAdornment position="start">{prefix}</InputAdornment> : false,
    endAdornment: suffix ? <InputAdornment position="end">{suffix}</InputAdornment> : false
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (formikProps) formikProps.handleChange(event);
    if (typeof props.onChange === 'function') props.onChange(event);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (formikProps) formikProps.handleBlur(event);
    if (typeof props.onBlur === 'function') props.onBlur(event);
  };

  return (
    <>
      {label && labelPlacement === 'above' && (
        <label className="lc-input-label" htmlFor={id || name}>
          {label}
        </label>
      )}
      <TextField
        name={name}
        id={id || name}
        InputProps={inputProps}
        label={labelPlacement === 'inset' ? label : false}
        {...props}
        error={!!fieldError}
        helperText={fieldError}
        size="small"
        className={classNames(className, { 'lc-input-label-above': labelPlacement === 'above' }, 'lc-input')}
        value={fieldValue || props.value}
        onChange={handleChange}
        onBlur={handleBlur}
        variant={variant}
      />
    </>
  );
};
