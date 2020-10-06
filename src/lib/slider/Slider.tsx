import React, { ChangeEvent, FormEvent } from 'react';
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
  formikProps,
  value,
  ...sliderProps
}) => {
  const handleChange: (event: ChangeEvent<{}>, value: number | number[]) => void = (event, newValue) => {
    if (typeof onChange === 'function') onChange(event, newValue);
    if (formikProps) formikProps.setFieldValue(name, newValue);
  };

  return (
    <div className={classNames('lc-slider', className)}>
      {label && <label htmlFor={id || name}>{label}</label>}
      <MuiSlider
        {...sliderProps}
        id={id || name}
        valueLabelDisplay={valueLabelDisplay}
        onChange={handleChange}
        value={formikProps?.values[name] || value}
      />
    </div>
  );
};
