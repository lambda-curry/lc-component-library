import React, { FC } from 'react';
import { merge } from 'lodash';
import classNames from 'classnames';
import { ChartOptions } from 'chart.js';
import { ChartBase, ChartBaseProps } from '../ChartBase';
import { getComputedPieChartJSData, getPieChartPercentage, PieChartData } from '../chart.helpers';

export interface PieChartProps extends Partial<ChartBaseProps> {
  data?: PieChartData;
}

export const PieChart: FC<PieChartProps> = ({ className, options, type = 'pie', chartJSData, data, ...props }) => {
  const computedChartJSData = getComputedPieChartJSData(chartJSData, data);

  const defaultOptions: ChartOptions = {
    cutoutPercentage: 55,
    legend: {
      display: false
    },
    plugins: {
      datalabels: {
        color: 'white',
        borderRadius: 6,
        padding: { left: 12, right: 10, top: 4, bottom: 4 },
        backgroundColor: 'rgba(0,0,0,.3)',
        labels: {
          title: {
            font: {
              weight: 'bold'
            }
          }
        },
        formatter: (value: number, context: any) => getPieChartPercentage(value, computedChartJSData, 10)
      }
    }
  };

  return (
    <ChartBase
      chartJSData={computedChartJSData}
      options={merge(defaultOptions, options)}
      className={classNames('lc-chart-pie', className)}
      type={type}
      {...props}
    />
  );
};
