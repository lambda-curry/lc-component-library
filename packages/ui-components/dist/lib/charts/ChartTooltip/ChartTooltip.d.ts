import { FC, HTMLAttributes } from 'react';
import { ChartTooltipModel, ChartType } from 'chart.js';
import { ChartJSData, ChartRefObject, ChartTooltipComponent } from '../chart.helpers';
export interface ChartTooltipProps extends HTMLAttributes<HTMLDivElement> {
    type: ChartType;
    data: ChartJSData;
    model: Omit<ChartTooltipModel, 'labelColors'> & {
        labelColors: any[];
    };
    chartRef: ChartRefObject;
    component?: ChartTooltipComponent;
}
export declare const ChartTooltip: FC<ChartTooltipProps>;
export declare type RenderChartTooltipProps = (props: ChartTooltipProps) => void;
export declare const renderChartTooltip: RenderChartTooltipProps;
