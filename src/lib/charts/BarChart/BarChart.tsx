import React, { FC } from 'react';
import { ChartOptions } from 'chart.js';
import { merge } from 'lodash';
import { Bar, ChartData } from 'react-chartjs-2';
import { customTooltip } from '../chart.helpers';

export interface BarChartProps {
  chartJSData: ChartData<Chart.ChartData>;
  options?: ChartOptions;
}

export const BarChart: FC<BarChartProps> = props => {
  const chartRef = React.useRef<Bar>(null);

  const defaultOptions: ChartOptions = {
    legend: { display: false },
    tooltips: {
      enabled: false,
      custom: tooltipModel => customTooltip(tooltipModel, chartRef)
    },
    scales: {
      gridLines: {
        drawBorder: false
      },
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          },
          gridLines: {
            color: '#dedede',
            borderDash: [2, 2],
            drawBorder: false
          }
        }
      ],
      xAxes: [
        {
          gridLines: {
            display: false
          }
        }
      ]
    },
    plugins: {
      datalabels: {
        display: false
      }
    }
  };
  const options = merge(defaultOptions, props.options);

  return <Bar ref={chartRef} data={props.chartJSData} options={options} />;
};
