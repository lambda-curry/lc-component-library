import React, { FC, createRef } from 'react';
import classNames from 'classnames';
import { ChartTooltipModel, ChartType } from 'chart.js';
import ChartComponent, { ChartComponentProps } from 'react-chartjs-2';
import { renderChartTooltip } from './ChartTooltip/ChartTooltip';
import { merge } from 'lodash';
import {
  ChartJSData,
  ChartJSOptions,
  ChartRefComponent,
  ChartTooltipComponent,
  ChartLegendComponent
} from './chart.helpers';
import { ChartLegendWrapper } from './ChartLegend/ChartLegendWrapper';

import './chart.css';

export interface ChartBaseProps extends Omit<ChartComponentProps, 'data'> {
  chartJSData: ChartJSData;
  className?: string;
  options?: ChartJSOptions;
  tooltipComponent?: ChartTooltipComponent;
  legendComponent?: ChartLegendComponent;
  type?: ChartType;
}

export const ChartBase: FC<ChartBaseProps> = ({
  type,
  options,
  chartJSData: data,
  className,
  tooltipComponent,
  legendComponent,
  ...props
}) => {
  const chartRef = createRef<ChartRefComponent>();

  const baseOptions: ChartJSOptions = {
    legend: {
      display: false
    },
    tooltips: {
      enabled: false,
      custom: (tooltipModel: ChartTooltipModel) =>
        renderChartTooltip({ type, data, model: tooltipModel, chartRef, component: tooltipComponent })
    },
    plugins: {
      datalabels: {
        display: false
      }
    }
  };

  return (
    <div className={classNames('lc-chart', className)}>
      <div className="lc-chart-canvas-wrapper" style={{ position: 'relative' }}>
        <ChartComponent type={type} ref={chartRef} data={data} options={merge(baseOptions, options)} {...props} />
      </div>
      <ChartLegendWrapper type={type} chartRef={chartRef} data={data} component={legendComponent} />
    </div>
  );
};
