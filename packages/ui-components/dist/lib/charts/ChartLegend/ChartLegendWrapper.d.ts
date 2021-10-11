import { FC, HTMLAttributes } from 'react';
import { ChartJSData, ChartJSDataFunction, ChartLegendComponent, ChartRefObject } from '../chart.helpers';
export interface ChartLegendWrapperProps extends HTMLAttributes<HTMLDivElement> {
    type?: string;
    data: ChartJSData | ChartJSDataFunction;
    chartRef: ChartRefObject;
    component?: ChartLegendComponent;
}
export declare const ChartLegendWrapper: FC<ChartLegendWrapperProps>;
