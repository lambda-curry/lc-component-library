import React, { useState, useEffect } from 'react';
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
  disableOnChange?: boolean;
} & CheckboxProps;

export const InputCheckbox = ({
  label,
  className,
  onChange,
  disableOnChange,
  labelPlacement,
  color = 'primary',
  formikProps,
  ...props
}: InputCheckboxProps<any>) => {
  const fieldProps = formikProps?.getFieldProps(props.name);
  const [checked, setChecked] = useState(!!fieldProps?.value || !!props.checked);

  useEffect(() => {
    setChecked(!!props.checked);
  }, [props.checked]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (disableOnChange) {
      return;
    }

    setChecked(event.target.checked);

    if (onChange) {
      onChange(event, event.target.checked);
    }

    if (fieldProps?.onChange) {
      fieldProps.onChange(event);
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
