import React, { ChangeEvent, FocusEvent } from 'react';
import { Slider as MuiSlider, SliderProps as MuiSliderProps, SliderTypeMap } from '@material-ui/core';
import classNames from 'classnames';
import { FormikProps } from 'formik';

export type SliderProps = MuiSliderProps<SliderTypeMap['defaultComponent']> & {
  name: string;
  label?: string;
  formikProps?: FormikProps<any>;
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
  const handleChange: (event: ChangeEvent<any>, value: any) => void = (event, newValue) => {
    if (typeof onChange === 'function') onChange(event, newValue);
    if (formikProps) formikProps.setFieldValue(name, newValue);
  };

  const handleBlur: (event: React.FocusEvent<HTMLSpanElement>) => void = event => {
    if (typeof onBlur === 'function') onBlur(event);
    if (formikProps) formikProps.handleBlur(event);
  };

  return (
    <div className={classNames('lc-slider', className)}>
      {label && <label htmlFor={id || name}>{label}</label>}
      <MuiSlider
        {...sliderProps}
        id={id || name}
        valueLabelDisplay={valueLabelDisplay}
        onChange={handleChange}
        onBlur={handleBlur}
        value={formikProps?.values[name] || value}
      />
    </div>
  );
};
