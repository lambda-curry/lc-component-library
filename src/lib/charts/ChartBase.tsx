import React, { FC, RefObject } from 'react';
import { ChartOptions, ChartTooltipModel, ChartType } from 'chart.js';
import classNames from 'classnames';
import ChartComponent, { ChartComponentProps, ChartData } from 'react-chartjs-2';
import ReactDOM from 'react-dom';
import { ChartTooltip } from './ChartTooltip/ChartTooltip';
import { merge } from 'lodash';

export type ChartRef = ChartComponent<ChartComponentProps>;

export interface ChartBaseProps {
  data: ChartData<Chart.ChartData>;
  options: ChartOptions;
  className?: string;
  type: ChartType;
}

export const ChartBase: FC<ChartBaseProps> = ({ options, className, ...props }) => {
  const chartRef = React.createRef<ChartRef>();

  // Note: Abstracted from https://github.com/reactchartjs/react-chartjs-2/issues/151#issuecomment-470282163
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

  return (
    <div className={classNames('lc-chart', className)}>
      <ChartComponent ref={chartRef} options={merge(baseOptions, options)} {...props} />
    </div>
  );
};
