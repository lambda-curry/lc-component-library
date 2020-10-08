import React, { useState, useEffect } from 'react';
import { FormikProps } from 'formik';
import classNames from 'classnames';

import './input-switch.scss';

export type InputSwitchProps<T> = {
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
  onChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
};

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
  const [label, setLabel] = useState(props.label);
  const [checked, setChecked] = useState(!!fieldProps?.value || !!props.checked);

  useEffect(() => {
    if (checked && labelOn) {
      setLabel(labelOn);
    }

    if (!checked && labelOff) {
      setLabel(labelOff);
    }
  }, [checked, labelOn, labelOff]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);

    if (onChange) {
      onChange(event, event.target.checked);
    }

    if (fieldProps?.onChange) {
      fieldProps.onChange(event);
    }
  };

  const inputSwitchClassName = classNames(className, 'input input-switch', {
    [`input-switch--label-position-${labelPlacement}`]: label && labelPlacement,
    [`input-switch--disabled`]: disabled
  });

  return (
    <label htmlFor={id} className={inputSwitchClassName}>
      <input
        id={id}
        name={name}
        type="checkbox"
        className="input-switch__input"
        {...fieldProps}
        {...props}
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
      />
      <span className="input-switch__label">{label}</span>
    </label>
  );
};
