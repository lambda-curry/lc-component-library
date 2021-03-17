import React, { FC } from 'react';
import { ChartDataFunction } from 'react-chartjs-2';
import classNames from 'classnames';
import { merge } from 'lodash';
import { ChartJSData, ChartJSDataFunction, ChartJSOptions } from '../chart.helpers';
import { AxialChart, AxialChartProps } from '../AxialChart';

export interface LineChartProps extends Partial<AxialChartProps> {}

export const LineChart: FC<LineChartProps> = ({ labels, datasets, chartJSData, options, className, ...props }) => {
  const defaultOptions: ChartJSOptions = {};

  const getComputedData: ChartDataFunction<any> = (canvas?: HTMLElement): ChartJSData | ChartJSDataFunction => {
    if (chartJSData) return chartJSData;

    if (!datasets) return {} as ChartJSData;

    return {
      labels,
      datasets: datasets?.map(({ color, ...dataset }) => {
        return {
          fill: 'none',
          lineTension: 0,
          borderWidth: 2,
          borderColor: color,
          borderCapStyle: 'round',
          pointHitRadius: 3,
          pointBorderColor: 'transparent',
          pointBackgroundColor: 'transparent',
          pointHoverBorderColor: color,
          pointHoverBackgroundColor: color,
          ...dataset
        };
      })
    };
  };

  return (
    <AxialChart
      type="line"
      chartJSData={getComputedData}
      className={classNames('lc-chart-line', className)}
      options={merge(defaultOptions, options)}
      {...props}
    />
  );
};
