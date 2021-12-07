import React, { ChangeEvent, FocusEvent, ReactNode, FC, forwardRef } from 'react';
import TextField, { OutlinedTextFieldProps } from '@mui/material/TextField';
import { FormikProps } from 'formik';
import classNames from 'classnames';
import { get as _get, set as _set } from 'lodash';
import InputAdornment from '@mui/material/InputAdornment';
import { makeStyles } from '@mui/styles';
import './input.css';

type LabelPlacements = 'inset' | 'above';

const isLargerInput = () => {
  if (typeof window === 'undefined') return false;
  const height = getComputedStyle(document.documentElement).getPropertyValue('--lc-input-height');
  return parseInt(height.replace('px', '')) >= 56;
};

// Note: if you utilize the css property to create a custom sized input that changes the value of isLargerInput
// then you will need to adjust the top positioning of the input element
const useInputStyles = makeStyles({
  root: {
    height: 'var(--lc-input-height)'
  },
  input: {
    height: 'var(--lc-input-height)',
    '& input': {
      position: 'relative',
      top: isLargerInput() ? 'unset' : 'calc((56px - var(--lc-input-height)) * -1 / 2)'
    }
  },
  inputLabel: {
    top: 'calc((56px - var(--lc-input-height)) * -1 / 2)',
    '&.MuiInputLabel-shrink': {
      top: '0'
    }
  }
});

export interface InputConfig {
  labelPlacement?: 'inset' | 'above';
  safeName?: boolean;
  inputBorderWhite?: boolean;
  shrinkLabel?: boolean;
}

export type InputProps = Omit<OutlinedTextFieldProps, 'variant' | 'prefix'> & {
  name: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  formikProps?: Partial<FormikProps<any>> | FormikProps<any>;
  labelPlacement?: LabelPlacements;
  variant?: 'outlined' | 'standard' | 'filled'; // Don't remove any typing because this breaks the build. - Jake
  inputConfig?: InputConfig;
};

export const InputBase: FC<InputProps> = forwardRef(
  (
    {
      name,
      id,
      className,
      formikProps,
      prefix,
      suffix,
      label,
      labelPlacement = 'inset',
      variant = 'outlined',
      inputConfig,
      ...props
    },
    ref
  ) => {
    const styleClasses = useInputStyles();

    const config: InputConfig = {
      labelPlacement,
      ...formikProps?.status?.formConfig,
      ...inputConfig
    };

    const fieldValue = formikProps ? _get(formikProps?.values, name) : props.value;
    const fieldError =
      formikProps?.errors && name && _get(formikProps.touched, name) ? _get(formikProps.errors, name) : '';
    const serverError =
      formikProps?.status?.serverErrors && name && _get(formikProps.status.serverErrors, name)
        ? _get(formikProps.status.serverErrors, name)
        : '';
    const hasError = !!fieldError || !!serverError || props.error;
    const helperText = fieldError || serverError || props.helperText;

    const InputProps = {
      startAdornment: prefix ? <InputAdornment position="start">{prefix}</InputAdornment> : false,
      endAdornment: suffix ? <InputAdornment position="end">{suffix}</InputAdornment> : false,
      ...props.InputProps, // Note: don't remove these, passing `InputProps` in here allows InputSelect to work correctly
      className: classNames(props.InputProps?.className, styleClasses.input)
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      // Remove server errors.
      if (formikProps?.setStatus && formikProps?.status?.serverErrors)
        formikProps.setStatus({
          ...formikProps?.status,
          serverErrors: { ..._set(formikProps.status.serverErrors, name, '') }
        });

      if (formikProps?.handleChange) formikProps.handleChange(event);
      if (typeof props.onChange === 'function') props.onChange(event);
    };

    const handleBlur = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (formikProps?.handleBlur) formikProps.handleBlur(event);
      if (typeof props.onBlur === 'function') props.onBlur(event);
    };

    const hasLabelAbove = label && config.labelPlacement === 'above';

    return (
      <div
        className={classNames('lc-input-wrapper', {
          'lc-input-label-above': hasLabelAbove,
          'lc-input-border-white': config.inputBorderWhite
        })}
      >
        {hasLabelAbove && (
          <label className="lc-input-label" htmlFor={id || name}>
            {label}
          </label>
        )}
        <TextField
          ref={ref}
          name={config.safeName ? `['${name}']` : name}
          id={id || name}
          label={config.labelPlacement === 'inset' ? label : false}
          margin="dense"
          {...props}
          InputProps={InputProps}
          error={hasError}
          helperText={helperText}
          className={classNames(className, 'lc-input', styleClasses.root)}
          value={fieldValue}
          onChange={handleChange}
          onBlur={handleBlur}
          variant={variant}
          InputLabelProps={{
            shrink: config.shrinkLabel,
            ...props.InputLabelProps,
            className: classNames(styleClasses.inputLabel, props.InputLabelProps?.className)
          }}
        />
        {config?.safeName && (
          <input
            type="hidden"
            name={name}
            defaultValue={
              typeof formikProps?.values[name] === 'object'
                ? JSON.stringify(formikProps?.values[name])
                : formikProps?.values[name]
            }
          />
        )}
      </div>
    );
  }
);
