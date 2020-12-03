import React, { useState, useEffect } from 'react';
import { FormikProps } from 'formik';
import classNames from 'classnames';

import './input-switch.scss';

export interface InputSwitchProps<T> {
  id?: string;
  name?: string;
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  labelOn?: string;
  labelOff?: string;
  labelPlacement?: 'end' | 'start';
  formikProps?: FormikProps<T>;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

export const InputSwitch = ({
  id,
  name,
  disabled,
  labelOn,
  labelOff,
  labelPlacement = 'end',
  formikProps,
  className,
  onChange,
  ...props
}: InputSwitchProps<any>) => {
  const fieldProps = formikProps?.getFieldProps(name);
  const fieldValue = !!fieldProps?.value || !!props.checked;
  const [label, setLabel] = useState(props.label);

  useEffect(() => {
    if (fieldValue && labelOn) setLabel(labelOn);
    if (!fieldValue && labelOff) setLabel(labelOff);
  }, [fieldValue, labelOn, labelOff]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(event, event.target.checked);
    if (fieldProps?.onChange) fieldProps.onChange(event);
  };

  const inputSwitchClassName = classNames(
    'lc-input',
    'lc-input-switch',
    {
      [`lc-input-switch-label-position-${labelPlacement}`]: label && labelPlacement,
      [`lc-input-switch-disabled`]: disabled
    },
    className
  );

  return (
    <label htmlFor={id} className={inputSwitchClassName}>
      <input
        id={id}
        name={name}
        type="checkbox"
        className="lc-input-switch-input"
        {...fieldProps}
        {...props}
        checked={fieldValue}
        disabled={disabled}
        onChange={handleChange}
      />
      <span className="lc-input-switch-label">{label}</span>
    </label>
  );
};
