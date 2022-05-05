import React, { FC } from 'react';
import merge from 'lodash/merge';
import classNames from 'classnames';
import { ChartBase, ChartBaseProps } from '../ChartBase';
import { ChartJSData, getComputedPieChartJSData, getPieChartPercentage, PieChartData } from '../chart.helpers';
import { ChartOptions } from 'chart.js';

import './pie-chart-legend.css';

export interface PieChartProps extends Partial<ChartBaseProps> {
  data?: PieChartData;
}

export interface PieChartLegendProps {
  data: ChartJSData;
}

export const PieChartLegend: FC<PieChartLegendProps> = ({ data }) => {
  if (!data.datasets || !data.datasets[0].data || !data.labels) return null;

  const dataset = data.datasets[0];
  const datasetData = dataset.data as number[];
  const dataLabels = data.labels as string[];
  const backgroundColors = dataset.backgroundColor as string[];

  return (
    <div className="lc-pie-chart-legend">
      <ul className="lc-pie-chart-legend-list">
        {datasetData.map((value, index) => {
          const label = dataLabels[index];
          const backgroundColor = backgroundColors[index];
          const pieChartPercentage = getPieChartPercentage(value, data);

          return (
            <li key={index} className="lc-pie-chart-legend-item">
              <div className="lc-pie-chart-legend-color" style={{ backgroundColor: backgroundColor }}></div>
              <div className="lc-pie-chart-legend-label">
                <span className="lc-pie-chart-legend-label-name">{label}</span>{' '}
                <span className="lc-pie-chart-legend-label-value">{value}</span>{' '}
                {pieChartPercentage && (
                  <span className="lc-pie-chart-legend-label-percentage">{pieChartPercentage}</span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

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
      legendComponent={PieChartLegend}
      {...props}
    />
  );
};
