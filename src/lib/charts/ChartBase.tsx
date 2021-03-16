import React, { FC, createRef } from 'react';
import { ChartOptions, ChartTooltipModel, ChartType } from 'chart.js';
import classNames from 'classnames';
import ChartComponent from 'react-chartjs-2';
import { renderChartTooltip } from './ChartTooltip/ChartTooltip';
import { merge } from 'lodash';
import {
  ChartJSData,
  ChartRefComponent,
  ChartTooltipComponent,
  ChartLegendComponent,
  ChartJSDataFunction
} from './chart.helpers';
import { ChartLegend } from './ChartLegend/ChartLegend';

export interface ChartBaseProps {
  chartJSData: ChartJSData | ChartJSDataFunction;
  className?: string;
  options?: ChartOptions;
  tooltip?: ChartTooltipComponent;
  legend?: ChartLegendComponent;
  type?: ChartType;
}

export const ChartBase: FC<ChartBaseProps> = ({ options, chartJSData: data, className, tooltip, legend, ...props }) => {
  const chartRef = createRef<ChartRefComponent>();

  const baseOptions: ChartOptions = {
    legend: {
      display: !legend
    },
    tooltips: {
      enabled: false,
      custom: (tooltipModel: ChartTooltipModel) => renderChartTooltip(tooltipModel, chartRef, tooltip)
    }
  };

  return (
    <div className={classNames('lc-chart', className)}>
      <ChartComponent ref={chartRef} data={data} options={merge(baseOptions, options)} {...props} />
      <ChartLegend chartRef={chartRef} data={data} component={legend} />
    </div>
  );
};
