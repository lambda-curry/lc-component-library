import React, { FC, FormEvent, FocusEvent } from 'react';
import { Slider, SliderProps } from './Slider';
import { DateTime, Interval, LocaleOptions } from 'luxon';
import classNames from 'classnames';
import { isNullOrUndefined } from '../util/js-helpers';

export interface TimeRange {
  startTime: string; // 00:00 - 24:00
  endTime: string;
}

const intervalStartInMinutes = (interval: Interval) => interval.start.toSeconds() / 60;
const intervalEndInMinutes = (interval: Interval) => interval.end.toSeconds() / 60;
const dateTimeFromValue = (value: string) => DateTime.fromFormat(value, 'HH:mm');
const timeRangeFromRangeValue: (rangeValue: number[], data: { minTime: string; min: number }) => TimeRange = (
  rangeValue,
  { minTime, min }
) => {
  const localeStartTimeString = DateTime.fromSeconds(rangeValue[0] * 60).toLocaleString(
    DateTime.TIME_24_SIMPLE as LocaleOptions & Intl.DateTimeFormatOptions
  );
  const localeEndTimeString = DateTime.fromSeconds(rangeValue[1] * 60).toLocaleString(
    DateTime.TIME_24_SIMPLE as LocaleOptions & Intl.DateTimeFormatOptions
  );
  const [minTimeHours] = minTime.split(':');
  const [startTimeHours, startTimeMinutes] = localeStartTimeString.split(':');
  const [endTimeHours, endTimeMinutes] = localeEndTimeString.split(':');

  const isStartTimeBefore1AM = startTimeHours === '24' && minTimeHours === '00' && rangeValue[0] - min < 60;
  const isEndTimeBefore1AM = endTimeHours === '24' && minTimeHours === '00' && rangeValue[1] - min < 60;

  const startTime = `${isStartTimeBefore1AM ? '00' : startTimeHours}:${startTimeMinutes}`;
  const endTime = `${isEndTimeBefore1AM ? '00' : endTimeHours}:${endTimeMinutes}`;

  return { startTime, endTime };
};
const labelFromRangeMinutes = (rangeMinutes: number) => {
  const dateTime = DateTime.fromSeconds(rangeMinutes * 60);
  return dateTime.toLocaleString(DateTime.TIME_SIMPLE as LocaleOptions & Intl.DateTimeFormatOptions);
};

export interface TimeRangeSliderProps extends Omit<SliderProps, 'value' | 'onChange'> {
  value?: TimeRange;
  onChange?: (event: FormEvent<any>, value: TimeRange) => void;
  minuteInterval?: number;
  minTime?: string;
  maxTime?: string;
}

export const TimeRangeSlider: FC<TimeRangeSliderProps> = ({
  className,
  name,
  value,
  minTime = '00:00',
  maxTime = '24:00',
  valueLabelDisplay = 'on',
  minuteInterval = 15,
  formikProps,
  onChange,
  onBlur,
  ...sliderProps
}) => {
  const sliderValue = isNullOrUndefined(formikProps?.values[name]) ? value : formikProps?.values[name];

  if (!sliderValue || !(sliderValue as TimeRange).startTime || !(sliderValue as TimeRange).endTime) {
    throw new Error(
      `Time Range Slider expects a value of type TimeRange {
        startTime: string; // 00:00 - 24:00
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

  const handleChange: (event: FormEvent<any>, value: number | number[]) => void = (event, rangeValue) => {
    if (!rangeValue) return;
    const timeRange: TimeRange = timeRangeFromRangeValue(rangeValue as number[], { minTime, min });
    if (typeof onChange === 'function') onChange(event as FormEvent<any>, timeRange);

    if (formikProps) formikProps.setFieldValue(name, timeRange);
  };

  const handleBlur: (event: FocusEvent<Element>) => void = event => {
    // Note: we need to set the id here, because the Mui slider is not a normal input
    event.target.id = name;
    if (typeof onBlur === 'function') onBlur(event);
    if (formikProps) formikProps.handleBlur(event);
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
      // Note: Mui types were expecting onChange?: (((event: ChangeEvent<{}>, value: number | number[]) => void) & ((event: FormEvent<HTMLSpanElement>) => void)) | undefined
      // but ((event: FormEvent<HTMLSpanElement>) => void)) is coming from an extended value and I'm not sure what to do about that. - Jake 10/05/2020
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
};
