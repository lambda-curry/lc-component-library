import React, { FC, createRef } from 'react';
import classNames from 'classnames';
import { ChartTooltipModel } from 'chart.js';
import ChartComponent, { ChartComponentProps } from 'react-chartjs-2';
import { renderChartTooltip } from './ChartTooltip/ChartTooltip';
import { merge } from 'lodash';
import { ChartJSData, ChartJSOptions, ChartRefComponent, ChartTooltipComponent } from './chart.helpers';

export interface ChartBaseProps extends Omit<ChartComponentProps, 'data'> {
  chartJSData: ChartJSData;
  className?: string;
  options?: ChartJSOptions;
  tooltip?: ChartTooltipComponent;
}

export const ChartBase: FC<ChartBaseProps> = ({ type, options, chartJSData: data, className, tooltip, ...props }) => {
  const chartRef = createRef<ChartRefComponent>();

  const baseOptions: ChartJSOptions = {
    legend: {
      display: false
    },
    tooltips: {
      enabled: false,
      custom: (tooltipModel: ChartTooltipModel) => renderChartTooltip(tooltipModel, chartRef, tooltip)
    },
    plugins: {
      datalabels: {
        display: false
      }
    }
  };

  return (
    <div className={classNames('lc-chart', className)}>
      <ChartComponent type={type} ref={chartRef} data={data} options={merge(baseOptions, options)} {...props} />
    </div>
  );
};
