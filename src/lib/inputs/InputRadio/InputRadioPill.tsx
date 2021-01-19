import React from 'react';
import { FormControlLabel as MuiFormControlLabel, FormControlLabelProps } from '@material-ui/core';
import classNames from 'classnames';
import { FormikProps, FormikValues } from 'formik';
import './input-radio-pill.scss';

export type InputRadioPillProps = {
  className?: string;
  color?: string;
  label: string;
  labelPlacement?: FormControlLabelProps['labelPlacement'];
  formikProps?: FormikProps<FormikValues>;
  inputs: Array<any>;
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputRadioPill: React.FC<InputRadioPillProps> = ({
  className,
  color = 'primary',
  formikProps,
  label,
  labelPlacement,
  name,
  onChange,
  inputs,
  ...props
}) => {
  const fieldProps = formikProps?.getFieldProps(name);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(event);
    if (fieldProps?.onChange) fieldProps.onChange(event);
  };

  return (
    <MuiFormControlLabel
      {...props}
      className={classNames('lc-input lc-input-radio-pill', className)}
      color={color}
      label={label}
      labelPlacement={labelPlacement}
      control={
        <>
          {inputs.map(input => (
            <div
              key={input.id}
              className={classNames({
                'lc-input-radio-pill--input': true,
                active: fieldProps?.value === input.value
              })}
            >
              <input id={`test-${input.id}`} type="radio" name={name} value={input.value} onChange={handleChange} />
              <label htmlFor={`test-${input.id}`} className="lc-input-radio-pill--label">
                {input.label}
              </label>
            </div>
          ))}
        </>
      }
    />
  );
};
