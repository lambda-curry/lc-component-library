import { ChartColor, ChartOptions, ChartTooltipModel } from 'chart.js';
import { merge } from 'lodash';
import React from 'react';
import { Pie, ChartData } from 'react-chartjs-2';
import { ChartTooltip } from '../ChartTooltip/ChartTooltip';

export const PieChart: React.FC<{
  data?: {
    label: string;
    value: number;
    color?: ChartColor;
  }[];
  chartJSData?: ChartData<Chart.ChartData>;
  options?: ChartOptions;
}> = props => {
  const chartRef = React.useRef<any>();
  const [tooltipModel, setTooltipModel] = React.useState<ChartTooltipModel | undefined>();

  const defaultOptions: ChartOptions = {
    tooltips: {
      enabled: false,
      custom: setTooltipModel
    },
    legend: {
      onClick: () => {
        // The default behavior is to toggle data points when the legend item is clicked, but since this is a pie chart
        // we don't really need that behavior.
      }
    }
  };

  const options = merge(defaultOptions, props.options);

  console.log(tooltipModel);

  const chartJSData: ChartData<Chart.ChartData> =
    props.chartJSData ||
    ({
      labels: props.data?.map(dataset => dataset.label),
      datasets: [
        { data: props.data?.map(dataset => dataset.value), backgroundColor: props.data?.map(dataset => dataset.color) }
      ]
    } as ChartData<Chart.ChartData>);

  return (
    <>
      <Pie ref={chartRef} data={chartJSData} options={options} />
      <ChartTooltip chartRef={chartRef} model={tooltipModel} />
    </>
  );
};
