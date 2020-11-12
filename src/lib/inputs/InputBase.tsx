import React, { ChangeEvent, FocusEvent } from 'react';
import TextField, { OutlinedTextFieldProps } from '@material-ui/core/TextField';
import { FastField, FormikProps } from 'formik';
import classNames from 'classnames';
import { get as _get } from 'lodash';

import './input.scss';
import { InputAdornment } from '@material-ui/core';

type LabelPlacements = 'inset' | 'above';

export type InputProps = Omit<OutlinedTextFieldProps, 'variant'> & {
  name: string;
  prefix?: JSX.Element;
  suffix?: JSX.Element;
  formikProps?: FormikProps<any>;
  labelPlacement?: LabelPlacements;
  variant?: 'outlined'; // Don't remove any typing because this breaks the build. - Jake
};

export const InputBase: React.FC<InputProps> = ({
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
}) => {
  const fieldError =
    formikProps?.errors && name && _get(formikProps.touched, name) ? _get(formikProps.errors, name) : '';

  const fieldValue = formikProps ? _get(formikProps?.values, name) : props.value;

  const inputProps: any = {
    startAdornment: prefix ? <InputAdornment position="start">{prefix}</InputAdornment> : false,
    endAdornment: suffix ? <InputAdornment position="end">{suffix}</InputAdornment> : false,
    ...props.inputProps,
    ...props.InputProps // Note: passing this in here allows InputSelect to work correctly
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (formikProps) formikProps.handleChange(event);
    if (typeof props.onChange === 'function') props.onChange(event);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (formikProps) formikProps.handleBlur(event);
    if (typeof props.onBlur === 'function') props.onBlur(event);
  };

  if (formikProps?.status?.config?.fastField) inputProps.inputComponent = FastField;

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
        label={labelPlacement === 'inset' ? label : false}
        size="small"
        {...props}
        InputProps={inputProps}
        error={!!fieldError}
        helperText={fieldError || props.helperText}
        className={classNames(className, { 'lc-input-label-above': labelPlacement === 'above' }, 'lc-input')}
        value={fieldValue}
        onChange={handleChange}
        onBlur={handleBlur}
        variant={variant}
      />
    </>
  );
};
