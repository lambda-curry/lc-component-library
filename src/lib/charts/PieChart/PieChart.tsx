import { ChartOptions } from 'chart.js';
import { merge } from 'lodash';
import React from 'react';
import { Pie, ChartData } from 'react-chartjs-2';

export const PieChart: React.FC<{
  data?: [{ label: string; value: number; color: string }];
  chartJSData?: ChartData<Chart.ChartData>;
  options?: ChartOptions;
}> = props => {
  const defaultOptions: ChartOptions = {
    legend: {
      onClick: () => {
        // The default behavior is to toggle data points when the legend item is clicked, but since this is a pie chart
        // we don't really need that behavior.
      }
    }
  };

  const options = merge(defaultOptions, props.options);

  const chartJSData: ChartData<Chart.ChartData> = props.chartJSData || {
    labels: props.data?.map(dataset => dataset.label),
    datasets: [
      { data: props.data?.map(dataset => dataset.value), backgroundColor: props.data?.map(dataset => dataset.color) }
    ]
  };

  return <Pie data={chartJSData} options={options} />;
};
