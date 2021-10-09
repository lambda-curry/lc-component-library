import { ReactNode, RefObject } from 'react';
import { ChartDataSets, ChartOptions } from 'chart.js';
import ChartComponent, { ChartComponentProps, LinearComponentProps, ChartDataFunction } from 'react-chartjs-2';
export declare type ChartLabels = Chart.ChartData['labels'];
export declare type ChartRefComponent = ChartComponent<ChartComponentProps | LinearComponentProps>;
export declare type ChartRefObject = RefObject<ChartRefComponent>;
export declare type ChartTooltipComponent = (props: {
    data: ChartTooltipData;
    chartRef: ChartRefObject;
}) => ReactNode;
export declare type ChartLegendComponentProps = {
    data: ChartJSData | ChartJSDataFunction;
    interactive?: boolean;
    onItemClick?: (event: React.MouseEvent<any, MouseEvent>, index: number) => void;
};
export declare type ChartLegendComponent = (props: ChartLegendComponentProps) => ReactNode;
export interface ChartJSOptions extends ChartOptions {
    borderRadius?: number;
    datasetDisplayLimit?: number;
}
export interface ChartJSData {
    labels?: ChartLabels;
    datasets?: Array<ChartDataSets & {
        borderRadius?: number;
    }>;
}
export declare type ChartJSDataFunction = ChartDataFunction<ChartJSData>;
export declare type ChartTooltipData = {
    datasetIndex?: number;
    datasetLabel?: string | number;
    label?: string;
    value?: string | number;
    xLabel?: string | number;
    yLabel?: string | number;
    x?: number;
    y?: number;
    color?: string;
};
export declare type PieChartData = {
    label: string;
    value: number;
    color: string;
}[];
export declare const getPieChartPercentage: (value: number, data: ChartJSData, hideUnderPercentage?: number | undefined) => string | null;
export declare const getComputedPieChartJSData: (chartJSData: ChartJSData | ChartDataFunction<ChartJSData> | undefined, pieChartData?: PieChartData) => ChartJSData;
