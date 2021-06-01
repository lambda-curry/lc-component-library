import React, { FC } from 'react';
import classNames from 'classnames';
import { FormikProps } from 'formik';
import { FormControlLabel, FormControlLabelProps, Radio, RadioProps } from '@material-ui/core';

export interface InputRadioProps extends RadioProps {
  label?: string;
  labelPlacement?: FormControlLabelProps['labelPlacement'];
  formikProps?: FormikProps<any>;
}

export const InputRadio: FC<InputRadioProps> = ({
  className,
  checked = false,
  color = 'primary',
  formikProps,
  label,
  labelPlacement,
  onChange,
  value,
  ...props
}) => {
  const fieldProps = formikProps?.getFieldProps(props.name);
  const fieldValue = fieldProps?.value === value;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(event, event.target.checked);
    if (fieldProps?.onChange) fieldProps.onChange(event);
  };

  return (
    <FormControlLabel
      control={<Radio {...props} color={color} checked={fieldValue || checked} onChange={handleChange} value={value} />}
      className={classNames('lc-input lc-input-radio')}
      label={label}
      labelPlacement={labelPlacement}
    />
  );
};
