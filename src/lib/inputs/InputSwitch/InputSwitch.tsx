import React, { useState, useEffect } from 'react';
import {
  Switch as MuiSwitch,
  SwitchProps,
  FormControlLabel as MuiFormControlLabel,
  FormControlLabelProps
} from '@material-ui/core';
import classNames from 'classnames';

import './input-switch.scss';
import { FieldProps } from 'formik';

export type InputSwitchProps = SwitchProps &
  FieldProps & {
    label?: string;
    labelOn?: string;
    labelOff?: string;
    labelPlacement?: FormControlLabelProps['labelPlacement'];
  };

export const InputSwitch = ({
  className,
  field,
  form,
  meta,
  labelOn,
  labelOff,
  labelPlacement = 'end',
  onChange,
  ...props
}: InputSwitchProps) => {
  const [label, setLabel] = useState(props.label);
  const [checked, setChecked] = useState(!!field?.checked || !!props.checked);

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
      onChange(event, checked);
    }
  };

  return (
    <div className={classNames(className, 'input input-switch')}>
      <MuiFormControlLabel
        control={
          <MuiSwitch {...field} {...props} checked={checked} onChange={handleChange} color="default" size="medium" />
        }
        label={label}
        labelPlacement={labelPlacement}
      />
    </div>
  );
};
