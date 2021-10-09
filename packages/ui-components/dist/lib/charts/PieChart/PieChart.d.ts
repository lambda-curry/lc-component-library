import { FC } from 'react';
import { ChartBaseProps } from '../ChartBase';
import { PieChartData } from '../chart.helpers';
import './pie-chart-legend.css';
export interface PieChartProps extends Partial<ChartBaseProps> {
    data?: PieChartData;
}
export declare const PieChart: FC<PieChartProps>;
