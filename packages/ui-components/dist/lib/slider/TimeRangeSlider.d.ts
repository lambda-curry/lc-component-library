import { FC, FormEvent } from 'react';
import { SliderProps } from './Slider';
export interface TimeRange {
    startTime: string;
    endTime: string;
}
export interface TimeRangeSliderProps extends Omit<SliderProps, 'value' | 'onChange'> {
    value?: TimeRange;
    onChange?: (event: FormEvent<any>, value: TimeRange) => void;
    minuteInterval?: number;
    minTime?: string;
    maxTime?: string;
}
export declare const TimeRangeSlider: FC<TimeRangeSliderProps>;
