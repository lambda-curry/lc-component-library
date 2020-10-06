import React, { ChangeEvent, FormEvent } from 'react';
import { Slider, SliderProps } from './Slider';
import { DateTime, Interval } from 'luxon';
import classNames from 'classnames';

const intervalStartInMinutes = (interval: Interval) => interval.start.toSeconds() / 60;
const intervalEndInMinutes = (interval: Interval) => interval.end.toSeconds() / 60;
const dateTimeFromValue = (value: string) => DateTime.fromFormat(value, 'HH:mm');
const localeFromRangeMinutes = (rangeMinutes: number) => {
  const localeString = DateTime.fromSeconds(rangeMinutes * 60).toLocaleString(DateTime.TIME_24_SIMPLE);
  const [HH, mm] = localeString.split(':');
  return `${HH === '24' ? '00' : HH}:${mm}`;
};
const labelFromRangeMinutes = (rangeMinutes: number) => {
  const dateTime = DateTime.fromSeconds(rangeMinutes * 60);
  return dateTime.toLocaleString(DateTime.TIME_SIMPLE);
};

export interface TimeRange {
  startTime: string; // 00:00 - 23:59
  endTime: string;
}

type TimeRangeSliderProps = SliderProps & {
  value?: TimeRange;
  minuteInterval?: number;
  minTime?: string;
  maxTime?: string;
};

export const TimeRangeSlider: React.FC<TimeRangeSliderProps> = ({
  className,
  name,
  value,
  minTime = '00:00',
  maxTime = '23:59',
  valueLabelDisplay = 'on',
  minuteInterval = 15,
  formikProps,
  onChange,
  ...sliderProps
}) => {
  const sliderValue = formikProps?.values[name] || value;

  if (!sliderValue || !(sliderValue as TimeRange).startTime || !(sliderValue as TimeRange).endTime) {
    throw new Error(
      `Time Range Slider expects a value of type TimeRange {
        startTime: string; // 00:00 - 23:59
        endTime: string;
      }`
    );
  }

  const minDateTime = dateTimeFromValue(minTime);
  const maxDateTime = dateTimeFromValue(maxTime);
  const rangeInterval = Interval.fromDateTimes(minDateTime, maxDateTime);
  const valueInterval = Interval.fromDateTimes(
    dateTimeFromValue(sliderValue.startTime),
    dateTimeFromValue(sliderValue.endTime)
  );

  const min = intervalStartInMinutes(rangeInterval);
  const max = intervalEndInMinutes(rangeInterval);

  const rangeValue = [intervalStartInMinutes(valueInterval), intervalEndInMinutes(valueInterval)];

  const handleChange: (event: FormEvent<any>, value: number | number[]) => void = (event, newValue) => {
    if (typeof onChange === 'function') onChange(event as FormEvent<any>, newValue);

    const [startTime, endTime] = (newValue as number[]).map(rangeItem => localeFromRangeMinutes(rangeItem));
    if (formikProps && newValue) formikProps.setFieldValue(name, { startTime, endTime });
  };

  return (
    <Slider
      {...sliderProps}
      className={classNames(className, 'lc-time-range-slider')}
      name={name}
      value={rangeValue}
      min={min}
      max={max}
      step={minuteInterval}
      valueLabelDisplay={valueLabelDisplay}
      valueLabelFormat={minutes => labelFromRangeMinutes(minutes)}
      // Note: Mui types were expecting onChange?: (((event: React.ChangeEvent<{}>, value: number | number[]) => void) & ((event: React.FormEvent<HTMLSpanElement>) => void)) | undefined
      // but ((event: React.FormEvent<HTMLSpanElement>) => void)) is coming from an extended value and I'm not sure what to do about that. - Jake 10/05/2020
      onChange={handleChange}
    />
  );
};
