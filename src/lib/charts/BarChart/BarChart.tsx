import React, { FC } from 'react';
import { merge } from 'lodash';
import classNames from 'classnames';
import { ChartJSData, ChartJSOptions } from '../chart.helpers';
import { ChartDataFunction } from 'react-chartjs-2';
import { AxialChart, AxialChartProps } from '../AxialChart';

import './roundedBarCharts';

export interface BarChartProps extends Partial<AxialChartProps> {}

export const BarChart: FC<BarChartProps> = ({ labels, datasets, chartJSData, options, className, ...props }) => {
  const defaultOptions: ChartJSOptions = {
    borderRadius: 100
  };

  const getComputedData: ChartDataFunction<any> = (canvas?: HTMLElement): ChartJSData => {
    if (chartJSData) return chartJSData;

    if (!datasets) return {} as ChartJSData;

    return {
      labels,
      datasets: datasets?.map(({ color, ...dataset }) => {
        return {
          backgroundColor: color,
          maxBarThickness: 7,
          categoryPercentage: 0.33,
          barPercentage: 0.5,
          borderRadius: 100,
          ...dataset
        };
      })
    };
  };

  return (
    <AxialChart
      type="bar"
      chartJSData={getComputedData}
      className={classNames('lc-chart-bar', className)}
      options={merge(defaultOptions, options)}
      {...props}
    />
  );
};
