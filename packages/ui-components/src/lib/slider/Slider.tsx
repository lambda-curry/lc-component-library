import React, { FC, FocusEvent, ElementType, HTMLAttributes, ReactNode, SyntheticEvent } from 'react';
import MuiSlider, { SliderValueLabel } from '@mui/material/Slider';

import classNames from 'classnames';
import { FormikProps } from 'formik';
import './slider.css';
import { isNullOrUndefined } from '../util/js-helpers';

export interface SliderProps {
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
  marks?: boolean | { label: string; value: any }[];
  max?: number;
  min?: number;
  onChange?: (event: Event, value: number | number[]) => void;
  onBlur?: (event: FocusEvent) => void;
  onChangeCommitted?: (event: Event | SyntheticEvent<Element, Event>, value: number | number[]) => void;
  orientation?: 'horizontal' | 'vertical';
  step?: number | null;
  scale?: (value: number) => number;
  ThumbComponent?: ElementType<HTMLAttributes<HTMLSpanElement>>;
  track?: 'normal' | false | 'inverted';
  value?: number | number[];
  ValueLabelComponent?: typeof SliderValueLabel;
  valueLabelDisplay?: 'on' | 'auto' | 'off';
  valueLabelFormat?: string | ((value: number, index: number) => ReactNode);
}

export const Slider: FC<SliderProps> = ({
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
  const handleChange: (event: Event, value: number | number[], activeThumb: number) => void = (event, newValue) => {
    if (typeof onChange === 'function') onChange(event, newValue);
    if (formikProps) formikProps.setFieldValue(name, newValue);
  };

  const handleBlur: (event: FocusEvent<HTMLSpanElement>) => void = event => {
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
