import { ReactNode, RefObject } from 'react';
import { ChartDataSets, ChartOptions, ChartTooltipModel } from 'chart.js';
import ChartComponent, { ChartComponentProps, LinearComponentProps, ChartDataFunction } from 'react-chartjs-2';

export type ChartLabels = Chart.ChartData['labels'];

export type ChartRefComponent = ChartComponent<ChartComponentProps | LinearComponentProps>;

export type ChartRefObject = RefObject<ChartRefComponent>;

export type ChartTooltipComponent = (props: { model: ChartTooltipModel; chartRef: ChartRefObject }) => ReactNode;

export type ChartLegendComponentProps = {
  data: ChartJSData | ChartJSDataFunction;
  interactive?: boolean;
  onItemClick?: (event: React.MouseEvent<any, MouseEvent>, index: number) => void;
};

export type ChartLegendComponent = (props: ChartLegendComponentProps) => ReactNode;

export interface ChartJSOptions extends ChartOptions {
  borderRadius?: number;
  datasetDisplayLimit?: number;
}

export interface ChartJSData {
  labels?: ChartLabels;
  datasets?: Array<ChartDataSets & { borderRadius?: number }>;
}

export type ChartJSDataFunction = ChartDataFunction<ChartJSData>;
