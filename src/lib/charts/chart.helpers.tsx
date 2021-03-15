import { ChartTooltipModel } from 'chart.js';
import React from 'react';
import { RefObject } from 'react';
import ChartComponent, { ChartComponentProps } from 'react-chartjs-2';
import ReactDOM from 'react-dom';
import { ChartTooltip } from './ChartTooltip/ChartTooltip';

export type ChartLabels = (string | number | string[] | number[] | Date | Date[] | moment.Moment | moment.Moment[])[];
export type ChartRef = RefObject<ChartComponent<ChartComponentProps>>;

// Note: Abstracted from https://github.com/reactchartjs/react-chartjs-2/issues/151#issuecomment-470282163
export const customTooltip = (
  tooltipModel: ChartTooltipModel,
  chartRef: ChartRef,
  tooltipComponent?: (tooltip: ChartTooltipModel, chartRef: ChartRef) => React.ReactNode
) => {
  let tooltipEl = document.getElementById('lc-chart-tooltip-wrapper');
  if (!tooltipEl) {
    tooltipEl = document.createElement('div');
    tooltipEl.id = 'lc-chart-tooltip-wrapper';
    document.body.appendChild(tooltipEl);
  }

  ReactDOM.render(<ChartTooltip model={tooltipModel} chartRef={chartRef} component={tooltipComponent} />, tooltipEl);
};
