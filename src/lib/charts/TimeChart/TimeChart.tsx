import React, { FC } from 'react';
import classNames from 'classnames';
import { merge } from 'lodash';
import { ChartJSOptions } from '../chart.helpers';
import { LineChart, LineChartProps } from '../LineChart/LineChart';

export interface TimeChartProps extends LineChartProps {}

export const TimeChart: FC<TimeChartProps> = ({ options, className, ...props }) => {
  const defaultOptions: ChartJSOptions = {
    scales: {
      xAxes: [
        {
          type: 'time',
          time: {
            minUnit: 'day',
            round: 'day'
          }
        }
      ]
    }
  };

  return (
    <LineChart className={classNames('lc-chart-time', className)} options={merge(defaultOptions, options)} {...props} />
  );
};
