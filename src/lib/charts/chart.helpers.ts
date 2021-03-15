import { RefObject } from 'react';
import ChartComponent, { ChartComponentProps } from 'react-chartjs-2';

export type ChartLabels = (string | number | string[] | number[] | Date | Date[] | moment.Moment | moment.Moment[])[];

export type ChartRefComponent = ChartComponent<ChartComponentProps>;

export type ChartRefObject = RefObject<ChartRefComponent>;
