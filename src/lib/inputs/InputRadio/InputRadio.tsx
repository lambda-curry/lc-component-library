import React from 'react';
import {
  Radio as MuiRadio,
  RadioProps,
  FormControlLabel as MuiFormControlLabel,
  FormControlLabelProps
} from '@material-ui/core';
import classNames from 'classnames';
import { FormikProps } from 'formik';

export type InputRadioProps<T> = {
  label: string;
  labelPlacement?: FormControlLabelProps['labelPlacement'];
  formikProps?: FormikProps<T>;
} & RadioProps;

export const InputRadio = ({
  className,
  color = 'primary',
  formikProps,
  label,
  labelPlacement,
  onChange,
  value,
  ...props
}: InputRadioProps<any>) => {
  const fieldProps = formikProps?.getFieldProps(props.name);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (fieldProps?.onChange) fieldProps.onChange(event);
  };

  return (
    <MuiFormControlLabel
      className={classNames('lc-input lc-input-radio', className)}
      label={label}
      labelPlacement={labelPlacement}
      control={<MuiRadio {...props} checked={fieldProps?.value == value} onChange={handleChange} value={value} />}
    />
  );
};
