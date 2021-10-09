import { FC } from 'react';
import { ChartDataSets } from 'chart.js';
import { ChartLabels } from './chart.helpers';
import { ChartBaseProps } from './ChartBase';
export interface AxialChartProps extends ChartBaseProps {
    labels?: ChartLabels;
    datasets?: Array<ChartDataSets & {
        color?: string;
    }>;
}
export declare const AxialChart: FC<AxialChartProps>;
