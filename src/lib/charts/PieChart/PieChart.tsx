import React, { FC } from 'react';
import { merge } from 'lodash';
import classNames from 'classnames';
import { ChartBase, ChartBaseProps } from '../ChartBase';
import { getComputedPieChartJSData, getPieChartPercentage, PieChartData } from '../chart.helpers';
import { ChartOptions } from 'chart.js';

export interface PieChartProps extends Partial<ChartBaseProps> {
  data?: PieChartData;
}

export const PieChart: FC<PieChartProps> = ({ className, options, chartJSData, data, ...props }) => {
  const computedChartJSData = getComputedPieChartJSData(chartJSData, data);

  const defaultOptions: ChartOptions = {
    cutoutPercentage: 55,
    legend: {
      display: false
    },
    plugins: {
      datalabels: {
        display: true,
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
      type="pie"
      height={1}
      width={1}
      chartJSData={computedChartJSData}
      options={merge(defaultOptions, options)}
      className={classNames('lc-chart-pie', className)}
      {...props}
    />
  );
};
