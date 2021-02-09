import React from 'react';
import { Mark, Slider as MuiSlider, ValueLabelProps } from '@material-ui/core';
import classNames from 'classnames';
import { FormikProps } from 'formik';
import './slider.css';
import { isNullOrUndefined } from '../util/js-helpers';

export type SliderProps = {
  id?: string;
  className?: string;
  name: string;
  label?: string;
  formikProps?: FormikProps<any>;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-valuetext'?: string;
  color?: 'primary' | 'secondary';
  defaultValue?: number | number[];
  disabled?: boolean;
  getAriaLabel?: (index: number) => string;
  getAriaValueText?: (value: number, index: number) => string;
  marks?: boolean | Mark[];
  max?: number;
  min?: number;
  onChange?: (event: React.ChangeEvent<any>, value: number | number[]) => void;
  onBlur?: (event: React.FocusEvent) => void;
  onChangeCommitted?: (event: React.ChangeEvent<any>, value: number | number[]) => void;
  orientation?: 'horizontal' | 'vertical';
  step?: number | null;
  scale?: (value: number) => number;
  ThumbComponent?: React.ElementType<React.HTMLAttributes<HTMLSpanElement>>;
  track?: 'normal' | false | 'inverted';
  value?: number | number[];
  ValueLabelComponent?: React.ElementType<ValueLabelProps>;
  valueLabelDisplay?: 'on' | 'auto' | 'off';
  valueLabelFormat?: string | ((value: number, index: number) => React.ReactNode);
};

export const Slider: React.FC<SliderProps> = ({
  id,
  name,
  valueLabelDisplay = 'auto',
  label,
  className,
  onChange,
  onBlur,
  formikProps,
  value,
  ...sliderProps
}) => {
  const handleChange: (event: React.ChangeEvent<any>, value: any) => void = (event, newValue) => {
    if (typeof onChange === 'function') onChange(event, newValue);
    if (formikProps) formikProps.setFieldValue(name, newValue);
  };

  const handleBlur: (event: React.FocusEvent<HTMLSpanElement>) => void = event => {
    // Note: we need to set the id here, because the Mui slider is not a normal input
    event.target.id = name;
    if (typeof onBlur === 'function') onBlur(event);
    if (formikProps) formikProps.handleBlur(event);
  };

  const defaultValue = isNullOrUndefined(formikProps?.values[name]) ? value : formikProps?.values[name];

  return (
    <div className={classNames('lc-slider', className)}>
      {label && <label htmlFor={id || name}>{label}</label>}
      <MuiSlider
        {...sliderProps}
        id={id || name}
        valueLabelDisplay={valueLabelDisplay}
        onChange={handleChange}
        onBlur={handleBlur}
        defaultValue={defaultValue}
      />
    </div>
  );
};
