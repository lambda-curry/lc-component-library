import { ReactNode, RefObject } from 'react';
import Chart, { ChartDataSets, ChartOptions, ChartTooltipModel } from 'chart.js';
import ChartComponent, { ChartComponentProps, LinearComponentProps, ChartDataFunction } from 'react-chartjs-2';

export type ChartLabels = Chart.ChartData['labels'];

export type ChartRefComponent = ChartComponent<ChartComponentProps | LinearComponentProps>;

export type ChartRefObject = RefObject<ChartRefComponent>;

export type ChartTooltipComponent = (tooltip: ChartTooltipModel, chartRef: ChartRefObject) => ReactNode;

export type ChartLegendComponent = (data: ChartJSData) => ReactNode;

export interface ChartJSOptions extends ChartOptions {
  borderRadius?: number;
}

export interface ChartJSData {
  labels?: ChartLabels;
  datasets?: Array<ChartDataSets & { borderRadius?: number }>;
}

export type ChartJSDataFunction = ChartDataFunction<ChartJSData>;
