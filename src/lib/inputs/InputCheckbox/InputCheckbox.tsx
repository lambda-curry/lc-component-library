import React from 'react';
import {
  Checkbox as MuiCheckbox,
  CheckboxProps,
  FormControlLabel as MuiFormControlLabel,
  FormControlLabelProps
} from '@material-ui/core';
import classNames from 'classnames';
import { FormikProps } from 'formik';
import { Icon } from '../..';

export type InputCheckboxProps<T> = {
  label: string;
  labelPlacement?: FormControlLabelProps['labelPlacement'];
  formikProps?: FormikProps<T>;
} & CheckboxProps;

export const InputCheckbox = ({
  label,
  className,
  onChange,
  labelPlacement,
  color = 'primary',
  formikProps,
  ...props
}: InputCheckboxProps<any>) => {
  const fieldProps = formikProps?.getFieldProps(props.name);
  const fieldValue = !!fieldProps?.value || !!props.checked;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof onChange === 'function') onChange(event, event.target.checked);
    if (fieldProps?.onChange) fieldProps.onChange(event);
  };

  return (
    <MuiFormControlLabel
      className={classNames('lc-input lc-input-checkbox', className)}
      label={label}
      labelPlacement={labelPlacement}
      control={
        <MuiCheckbox
          {...props}
          checked={fieldValue}
          onChange={handleChange}
          icon={<Icon name="checkbox" className="lc-input-checkbox-icon" />}
          checkedIcon={<Icon name="checkboxFilled" className="lc-input-checkbox-icon-filled" />}
          color={color}
        />
      }
    />
  );
};
