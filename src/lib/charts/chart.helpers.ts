import { ReactNode, RefObject } from 'react';
import { ChartTooltipModel } from 'chart.js';
import ChartComponent, { ChartData, ChartComponentProps, LinearComponentProps } from 'react-chartjs-2';

export type ChartLabels = (string | number | string[] | number[] | Date | Date[] | moment.Moment | moment.Moment[])[];

export type ChartRefComponent = ChartComponent<ChartComponentProps | LinearComponentProps>;

export type ChartRefObject = RefObject<ChartRefComponent>;

export type ChartTooltipComponent = (tooltip: ChartTooltipModel, chartRef: ChartRefObject) => ReactNode;

export type ChartLegendComponent = (data: ChartJSData) => ReactNode;

export type ChartJSData = ChartData<Chart.ChartData>;
