import { FC } from 'react';
import { ChartType } from 'chart.js';
import { ChartComponentProps } from 'react-chartjs-2';
import { ChartJSData, ChartJSOptions, ChartTooltipComponent, ChartLegendComponent } from './chart.helpers';
import './chart.css';
export interface ChartBaseProps extends Omit<ChartComponentProps, 'data'> {
    chartJSData: ChartJSData;
    className?: string;
    options?: ChartJSOptions;
    tooltipComponent?: ChartTooltipComponent;
    legendComponent?: ChartLegendComponent;
    type: ChartType;
}
export declare const ChartBase: FC<ChartBaseProps>;
