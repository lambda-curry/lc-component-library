import React, { FC } from 'react';
import classNames from 'classnames';
import { FormikProps } from 'formik';
import { FormControl, FormLabel, RadioGroup, RadioGroupProps } from '@material-ui/core';
import './input-radio.css';

export interface InputRadioGroupProps extends RadioGroupProps {
  className?: string;
  formikProps?: FormikProps<any>;
  label?: string;
}

export const InputRadioGroup: FC<InputRadioGroupProps> = ({ className, formikProps, label, onChange, ...props }) => {
  const fieldProps = formikProps?.getFieldProps(props.name);
  const value = props.value ?? fieldProps?.value;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(event, event.target.value);
    if (fieldProps?.onChange) fieldProps.onChange(event);
  };

  return (
    <FormControl className={classNames('lc-input-radio-group', className)} component="fieldset">
      {label && <FormLabel component="legend">{label}</FormLabel>}
      <RadioGroup aria-label={props.name} onChange={handleChange} value={value} {...props} />
    </FormControl>
  );
};
