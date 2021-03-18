import React, { FC } from 'react';
import { merge } from 'lodash';
import classNames from 'classnames';
import { ChartDataFunction } from 'react-chartjs-2';
import { ChartBase, ChartBaseProps } from '../ChartBase';
import { ChartJSData, ChartJSOptions } from '../chart.helpers';

export interface PieChartProps extends Partial<ChartBaseProps> {
  data?: {
    label: string;
    value: number;
    color: string;
  }[];
}

export const PieChart: FC<PieChartProps> = ({ chartJSData, data, options, className, ...props }) => {
  const defaultOptions: ChartJSOptions = {
    cutoutPercentage: 55,
    legend: {
      onClick: () => {
        // The default behavior is to toggle data points when the legend item is clicked, but since this is a pie chart
        // we don't really need that behavior.
      }
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
        formatter: function (value: any, context: any) {
          if (!data) return value;
          const total = data.reduce((acc, curr) => acc + curr.value, 0);
          const percentage = Math.round((value / total) * 100);
          if (percentage < 10) return null;
          return `${percentage}%`;
        }
      }
    }
  };

  const computedChartJSData: ChartDataFunction<any> = (canvas: HTMLElement): ChartJSData => {
    if (chartJSData) return chartJSData as ChartJSData;

    return {
      labels: data?.map(dataset => dataset.label),
      datasets: [
        {
          data: data?.map(dataset => dataset.value),
          backgroundColor: data?.map(dataset => dataset.color)
        }
      ]
    };
  };

  return (
    <ChartBase
      type="pie"
      chartJSData={computedChartJSData}
      options={merge(defaultOptions, options)}
      className={classNames('lc-chart-pie', className)}
      {...props}
    />
  );
};
