import React, { FC } from 'react';
import { ChartOptions, ChartTooltipModel, ChartType } from 'chart.js';
import classNames from 'classnames';
import ChartComponent, { ChartData } from 'react-chartjs-2';
import { renderChartTooltip } from './ChartTooltip/ChartTooltip';
import { merge } from 'lodash';
import { ChartRefObject, ChartRefComponent } from './chart.helpers';

export interface ChartBaseProps {
  chartJSData: ChartData<Chart.ChartData>;
  className?: string;
  options: ChartOptions;
  tooltip?: (tooltip: ChartTooltipModel, chartRef: ChartRefObject) => React.ReactNode;
  type: ChartType;
}

export const ChartBase: FC<ChartBaseProps> = ({ options, chartJSData: data, className, ...props }) => {
  const chartRef = React.createRef<ChartRefComponent>();

  const baseOptions: ChartOptions = {
    tooltips: {
      enabled: false,
      custom: (tooltipModel: ChartTooltipModel) => renderChartTooltip(tooltipModel, chartRef)
    }
  };

  return (
    <div className={classNames('lc-chart', className)}>
      <ChartComponent ref={chartRef} data={data} options={merge(baseOptions, options)} {...props} />
    </div>
  );
};
