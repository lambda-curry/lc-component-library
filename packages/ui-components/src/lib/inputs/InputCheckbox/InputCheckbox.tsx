import React, { FC, ChangeEvent } from 'react';
import MuiCheckbox, { CheckboxProps } from '@mui/material/Checkbox';
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel';
import classNames from 'classnames';
import { FormikProps } from 'formik';
import { Icon } from '../../icon/Icon';
import { get as _get } from 'lodash';

import './input-checkbox.css';
import { useFormContext } from '../../hooks';

export type InputCheckboxProps = {
  name: string;
  label: string;
  labelPlacement?: FormControlLabelProps['labelPlacement'];
  formikProps?: FormikProps<any>;
} & CheckboxProps;

export const InputCheckbox: FC<InputCheckboxProps> = ({
  label,
  className,
  onChange,
  labelPlacement,
  color = 'primary',
  formikProps,
  ...props
}) => {
  const formContext = useFormContext();
  if (!formikProps && formContext) formikProps = formContext;

  const fieldProps = formikProps?.getFieldProps(props.name);
  const fieldValue = _get(formikProps?.values, props.name);
  const isChecked = !!props.checked || (Array.isArray(fieldValue) ? fieldValue.includes(props.value) : !!fieldValue);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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
          checked={isChecked}
          onChange={handleChange}
          icon={<Icon name="checkbox" className="lc-input-checkbox-icon" />}
          checkedIcon={<Icon name="checkboxFilled" className="lc-input-checkbox-icon-filled" />}
          color={color}
        />
      }
    />
  );
};
