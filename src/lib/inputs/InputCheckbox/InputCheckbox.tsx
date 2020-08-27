import React, { useState } from 'react';
import {
  Checkbox as MuiCheckbox,
  CheckboxProps,
  FormControlLabel as MuiFormControlLabel,
  FormControlLabelProps
} from '@material-ui/core';
import classNames from 'classnames';
import { FieldProps } from 'formik';
import { Icon } from '../..';

import './input-checkbox.scss';

export type InputCheckboxProps = {
  label: string;
  labelPlacement?: FormControlLabelProps['labelPlacement'];
} & CheckboxProps &
  FieldProps;

export const InputCheckbox = ({
  field,
  form,
  label,
  onChange,
  className,
  labelPlacement,
  color = 'primary',
  ...props
}: InputCheckboxProps) => {
  const [checked, setChecked] = useState(!!field?.checked || !!props.checked);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);

    if (onChange) {
      onChange(event, checked);
    }
  };

  return (
    <MuiFormControlLabel
      className={classNames('input input-checkbox', classNames)}
      label={label}
      labelPlacement={labelPlacement}
      control={
        <MuiCheckbox
          {...field}
          {...props}
          checked={checked}
          onChange={handleChange}
          icon={<Icon name="checkbox" />}
          checkedIcon={<Icon name="checkboxFilled" />}
          color={color}
        />
      }
    />
  );
};
