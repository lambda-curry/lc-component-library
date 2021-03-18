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

export type PieChartData = {
  label: string;
  value: number;
  color: string;
}[];

export const getPieChartPercentage = (value: number, data: ChartJSData, hideUnderPercentage?: number) => {
  if (!data.datasets) return null;

  const dataset = data.datasets[0];
  const total = (dataset.data as number[]).reduce((acc, curr) => acc + curr, 0);
  const percentage = Math.round((value / total) * 100);
  if (isNaN(percentage) || (hideUnderPercentage && percentage < hideUnderPercentage)) return null;
  return `${percentage}%`;
};

export const getComputedPieChartJSData: (
  chartJSData: ChartJSData | ChartDataFunction<ChartJSData> | undefined,
  pieChartData?: PieChartData
) => ChartJSData = (chartJSData, pieChartData) => {
  if (chartJSData) return chartJSData as ChartJSData;

  return {
    labels: pieChartData?.map(dataset => dataset.label),
    datasets: [
      {
        data: pieChartData?.map(dataset => dataset.value),
        backgroundColor: pieChartData?.map(dataset => dataset.color)
      }
    ]
  };
};
