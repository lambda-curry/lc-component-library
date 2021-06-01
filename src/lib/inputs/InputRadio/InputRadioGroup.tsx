import React, { FC } from 'react';
import classNames from 'classnames';
import { FormikProps } from 'formik';
import { FormControl, FormLabel, RadioGroup, RadioGroupProps } from '@material-ui/core';

export interface InputRadioGroupProps extends RadioGroupProps {
  className?: string;
  formikProps?: FormikProps<any>;
  legend?: string;
}

export const InputRadioGroup: FC<InputRadioGroupProps> = ({
  children,
  className,
  formikProps,
  legend,
  name,
  onChange,
  row,
  value
}) => {
  const fieldProps = formikProps?.getFieldProps(name);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(event, event.target.value);
    if (fieldProps?.onChange) fieldProps.onChange(event);
  };

  return (
    <FormControl className={classNames('lc-input-radio-group', className)} component="fieldset">
      <FormLabel component="legend">{legend}</FormLabel>
      <RadioGroup aria-label={name} name={name} onChange={handleChange} row={row} value={value}>
        {children}
      </RadioGroup>
    </FormControl>
  );
};
