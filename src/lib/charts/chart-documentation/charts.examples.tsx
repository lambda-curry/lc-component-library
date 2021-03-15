import React from 'react';
import { PieChart, BarChart } from '..';
import { getCssVar } from '../../util/colors';
import { ChartRefObject } from '../chart.helpers';

export const PieChartExample1 = () => {
  return (
    <PieChart
      type="doughnut"
      tooltip={() => <div>Hello World</div>}
      legend={(chartRef: ChartRefObject) =>
        chartRef.current ? <div>Hello World {JSON.stringify(chartRef.current)}</div> : <div>Goodbye World</div>
      }
      data={[
        { label: 'Label 1', value: 1, color: `rgb(${getCssVar('lc-color-primary')})` },
        { label: 'Label 2', value: 4, color: `rgb(${getCssVar('lc-color-accent')})` },
        { label: 'Label 3', value: 6, color: `rgb(${getCssVar('lc-color-primary-dark')})` },
        { label: 'Label 4', value: 8, color: `rgb(${getCssVar('lc-color-accent-dark')})` }
      ]}
    />
  );
};

export const BarChartExample1 = () => (
  <BarChart
    chartJSData={{
      labels: [
        'Red',
        'Blue',
        'Yellow',
        'Green',
        'Purple',
        'Orange',
        'Red',
        'Blue',
        'Yellow',
        'Green',
        'Purple',
        'Orange',
        'Red',
        'Blue',
        'Yellow',
        'Green',
        'Purple',
        'Orange',
        'Red',
        'Blue',
        'Yellow',
        'Green',
        'Purple',
        'Orange',
        'Red',
        'Blue',
        'Yellow',
        'Green',
        'Purple',
        'Orange'
      ],
      datasets: [
        {
          label: 'Dataset 1',
          data: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3],
          backgroundColor: `rgb(${getCssVar('lc-color-primary')})`
        },
        {
          label: 'Dataset 2',
          data: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3],
          backgroundColor: `rgb(${getCssVar('lc-color-accent')})`
        },
        {
          label: 'Dataset 3',
          data: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3],
          backgroundColor: `rgb(${getCssVar('lc-color-primary-dark')})`
        },
        {
          label: 'Dataset 4',
          data: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3],
          backgroundColor: `rgb(${getCssVar('lc-color-accent-dark')})`
        }
      ]
    }}
  />
);
