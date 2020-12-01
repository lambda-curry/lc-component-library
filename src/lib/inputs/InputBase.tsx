import React, { ChangeEvent, FocusEvent } from 'react';
import TextField, { OutlinedTextFieldProps } from '@material-ui/core/TextField';
import { FormikProps } from 'formik';
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

  const InputProps: any = {
    startAdornment: prefix ? <InputAdornment position="start">{prefix}</InputAdornment> : false,
    endAdornment: suffix ? <InputAdornment position="end">{suffix}</InputAdornment> : false,
    ...props.InputProps // Note: don't remove these, passing `InputProps` in here allows InputSelect to work correctly
  };

  // Note: check to see if InputProps are passed to determine if the parent element is an InputSelect
  if (props.InputProps && props.inputProps?.onChange) InputProps.onChange = props.inputProps.onChange; // passing inputProps.onChange in here allows for custom input values to be made

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (formikProps) formikProps.handleChange(event);
    if (typeof props.onChange === 'function') props.onChange(event);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (formikProps) formikProps.handleBlur(event);
    if (typeof props.onBlur === 'function') props.onBlur(event);
  };

  const hasLabelAbove = label && labelPlacement === 'above';

  if (hasLabelAbove) {
    return (
      <div className="lc-input-wrapper">
        <label className="lc-input-label" htmlFor={id || name}>
          {label}
        </label>
        <TextField
          name={name}
          id={id || name}
          label={labelPlacement === 'inset' ? label : false}
          size="small"
          {...props}
          InputProps={InputProps}
          error={!!fieldError}
          helperText={fieldError || props.helperText}
          className={classNames(className, 'lc-input', 'lc-input-label-above')}
          value={fieldValue}
          onChange={handleChange}
          onBlur={handleBlur}
          variant={variant}
        />
      </div>
    );
  }

  return (
    <div className="lc-input-wrapper">
      <TextField
        name={name}
        id={id || name}
        label={labelPlacement === 'inset' ? label : false}
        size="small"
        {...props}
        InputProps={InputProps}
        error={!!fieldError}
        helperText={fieldError || props.helperText}
        className={classNames(className, 'lc-input')}
        value={fieldValue}
        onChange={handleChange}
        onBlur={handleBlur}
        variant={variant}
      />
    </div>
  );
};
