import React from 'react';
import {
  Radio as MuiRadio,
  RadioProps,
  FormControlLabel as MuiFormControlLabel,
  FormControlLabelProps
} from '@material-ui/core';
import classNames from 'classnames';
import { FormikProps, FormikValues } from 'formik';
import './input-radio.scss';

export type InputRadioProps = {
  label: string;
  labelPlacement?: FormControlLabelProps['labelPlacement'];
  formikProps?: FormikProps<FormikValues>;
} & RadioProps;

export const InputRadio: React.FC<InputRadioProps> = ({
  className,
  color = 'primary',
  formikProps,
  label,
  labelPlacement,
  onChange,
  value,
  ...props
}) => {
  const fieldProps = formikProps?.getFieldProps(props.name);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(event, event.target.checked);
    if (fieldProps?.onChange) fieldProps.onChange(event);
  };

  return (
    <MuiFormControlLabel
      className={classNames('lc-input lc-input-radio', className)}
      label={label}
      labelPlacement={labelPlacement}
      control={
        <MuiRadio
          {...props}
          color={color}
          checked={fieldProps ? fieldProps?.value === value : props.checked}
          onChange={handleChange}
          value={value}
        />
      }
    />
  );
};
