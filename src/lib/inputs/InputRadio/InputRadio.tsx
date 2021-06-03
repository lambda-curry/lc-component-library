import React, { FC } from 'react';
import classNames from 'classnames';
import { FormikProps } from 'formik';
import { FormControlLabel, FormControlLabelProps, Radio, RadioProps } from '@material-ui/core';
import './input-radio.css';

export interface InputRadioProps extends RadioProps {
  label?: string;
  labelPlacement?: FormControlLabelProps['labelPlacement'];
  formikProps?: FormikProps<any>;
}

export const InputRadio: FC<InputRadioProps> = ({
  className,
  color = 'primary',
  label,
  labelPlacement,
  value,
  ...props
}) => {
  return (
    <FormControlLabel
      control={<Radio {...props} color={color} />}
      className={classNames('lc-input lc-input-radio')}
      label={label}
      labelPlacement={labelPlacement}
      value={value}
    />
  );
};
