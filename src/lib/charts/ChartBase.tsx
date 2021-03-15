import React, { FC, RefObject } from 'react';
import { ChartOptions, ChartTooltipModel } from 'chart.js';
import classNames from 'classnames';
import { Bar, Pie, ChartData } from 'react-chartjs-2';
import ReactDOM from 'react-dom';
import { ChartTooltip } from './ChartTooltip/ChartTooltip';
import { merge } from 'lodash';

export type ChartRef = Pie | Bar;

export interface ChartBaseProps {
  data: ChartData<Chart.ChartData>;
  options: ChartOptions;
  className?: string;
  type: 'pie' | 'bar' | 'doughnut';
}

export const ChartBase: FC<ChartBaseProps> = ({ data, options, className, type, ...props }) => {
  const chartRef = React.createRef<ChartRef>();

  const customTooltip = (tooltipModel: ChartTooltipModel, chartRef: RefObject<ChartRef>) => {
    let tooltipEl = document.getElementById('lc-chart-tooltip-wrapper');
    if (!tooltipEl) {
      tooltipEl = document.createElement('div');
      tooltipEl.id = 'lc-chart-tooltip-wrapper';
      document.body.appendChild(tooltipEl);
    }

    ReactDOM.render(<ChartTooltip model={tooltipModel} chartRef={chartRef} />, tooltipEl);
  };

  const baseOptions: ChartOptions = {
    tooltips: {
      enabled: false,
      custom: (tooltipModel: ChartTooltipModel) => customTooltip(tooltipModel, chartRef)
    }
  };

  const chartTypes = {
    pie: Pie,
    bar: Bar,
    doughnut: Pie
  };

  const ChartComponent = chartTypes[type];

  return (
    <div className={classNames('lc-chart', className)}>
      <ChartComponent ref={chartRef} type={type} data={data} options={merge(baseOptions, options)} {...props} />
    </div>
  );
};
