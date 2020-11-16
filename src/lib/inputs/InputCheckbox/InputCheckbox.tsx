import React, { useState } from 'react';
import {
  Checkbox as MuiCheckbox,
  CheckboxProps,
  FormControlLabel as MuiFormControlLabel,
  FormControlLabelProps
} from '@material-ui/core';
import classNames from 'classnames';
import { FormikProps } from 'formik';
import { Icon } from '../..';

import './input-checkbox.scss';

export type InputCheckboxProps<T>  = {
  label: string;
  labelPlacement?: FormControlLabelProps['labelPlacement'];
  formikProps?: FormikProps<T>;
} & CheckboxProps;

export const InputCheckbox = ({
  label,
  onChange,
  className,
  labelPlacement,
  color = 'primary',
  formikProps,
  ...props
}: InputCheckboxProps<any>) => {
  const fieldProps = formikProps?.getFieldProps(name);
  const [checked, setChecked] = useState(!!fieldProps?.value || !!props.checked);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);

    if (onChange) {
      onChange(event, checked);
    }
  };

  return (
    <MuiFormControlLabel
      className={classNames('input input-checkbox', className)}
      label={label}
      labelPlacement={labelPlacement}
      control={
        <MuiCheckbox
          {...props}
          checked={checked}
          onChange={handleChange}
          icon={<Icon name="checkbox" className="input-checkbox-icon" />}
          checkedIcon={<Icon name="checkboxFilled" className="input-checkbox-icon-filled" />}
          color={color}
        />
      }
    />
  );
};
