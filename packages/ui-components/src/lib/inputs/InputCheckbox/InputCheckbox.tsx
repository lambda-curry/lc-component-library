import React, { FC, ChangeEvent } from 'react';
import {
  Checkbox as MuiCheckbox,
  CheckboxProps,
  FormControlLabel as MuiFormControlLabel,
  FormControlLabelProps
} from '@material-ui/core';
import classNames from 'classnames';
import { FormikProps } from 'formik';
import { Icon } from '../../icon/Icon';

import './input-checkbox.css';

export type InputCheckboxProps = {
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
  const fieldProps = formikProps?.getFieldProps(props.name);
  const fieldValue = !!fieldProps?.value || !!props.checked;

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
