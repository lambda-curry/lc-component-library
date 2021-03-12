import React from 'react';
import { PieChart, BarChart } from '..';

export const PieChartExample1 = () => (
  <PieChart
    data={[
      { label: 'Label 1', value: 1, color: 'red' },
      { label: 'Label 2', value: 2, color: 'blue' },
      { label: 'Label 3', value: 3, color: 'green' },
      { label: 'Label 4', value: 4, color: 'yellow' }
    ]}
  />
);

export const BarChartExample1 = () => (
  <BarChart
    chartJSData={{
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [
        {
          label: 'This Year',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        },
        {
          label: 'Last Year',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }
      ]
    }}
  />
);
