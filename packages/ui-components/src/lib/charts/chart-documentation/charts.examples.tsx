import React from 'react';
import { PieChart, BarChart, LineChart, TimeChart } from '..';
import { getCssVar } from '../../util/colors';
import { ChartLegendComponentProps } from '../chart.helpers';
import './chart-examples.css';

export const PieChartExample1 = () => {
  return (
    <div className="chart-row">
      <PieChart
        type="doughnut"
        tooltipComponent={() => <div>Hello World</div>}
        legendComponent={(props: ChartLegendComponentProps) => <div>Hello World</div>}
        data={[
          { label: 'Label 1', value: 1, color: `${getCssVar('lc-color-primary')}` },
          { label: 'Label 2', value: 4, color: `${getCssVar('lc-color-accent')}` },
          { label: 'Label 3', value: 6, color: `${getCssVar('lc-color-primary-dark')}` },
          { label: 'Label 4', value: 8, color: `${getCssVar('lc-color-accent-dark')}` }
        ]}
      />
      <PieChart
        type="doughnut"
        data={[
          { label: 'Label 1', value: 1, color: `${getCssVar('lc-color-primary')}` },
          { label: 'Label 2', value: 2, color: `${getCssVar('lc-color-accent')}` },
          { label: 'Label 3', value: 3, color: `${getCssVar('lc-color-primary-dark')}` },
          { label: 'Label 4', value: 4, color: `${getCssVar('lc-color-accent-dark')}` }
        ]}
      />
    </div>
  );
};

export const BarChartExample1 = () => (
  <BarChart
    width={200}
    height={75}
    labels={['Category 1', 'Category 2', 'Category 3', 'Category 4']}
    datasets={[
      {
        label: 'Dataset 1',
        data: [3, 7, 19, 12],
        color: `${getCssVar('lc-color-primary')}`
      },
      {
        label: 'Dataset 2',
        data: [10, 5, 17, 24],
        color: `${getCssVar('lc-color-accent')}`
      },
      {
        label: 'Dataset 3',
        data: [8, 12, 20, 4],
        color: `${getCssVar('lc-color-success')}`
      },
      {
        label: 'Dataset 4',
        data: [23, 16, 13, 19],
        color: `${getCssVar('lc-color-warning')}`
      },
      {
        label: 'Dataset 5',
        data: [13, 20, 4, 7],
        color: `${getCssVar('lc-color-danger')}`
      }
    ]}
  />
);

export const LineChartExample1 = () => {
  return (
    <LineChart
      width={200}
      height={75}
      options={{ legend: { display: false } }}
      labels={['Category 1', 'Category 2', 'Category 3', 'Category 4']}
      datasets={[
        {
          label: 'Dataset 1',
          data: [3, 7, 19, 12],
          color: `${getCssVar('lc-color-primary')}`
        },
        {
          label: 'Dataset 2',
          data: [10, 5, 17, 24],
          color: `${getCssVar('lc-color-accent')}`
        },
        {
          label: 'Dataset 3',
          data: [8, 12, 20, 4],
          color: `${getCssVar('lc-color-success')}`
        },
        {
          label: 'Dataset 4',
          data: [23, 16, 13, 19],
          color: `${getCssVar('lc-color-warning')}`
        },
        {
          label: 'Dataset 5',
          data: [13, 20, 4, 7],
          color: `${getCssVar('lc-color-danger')}`
        }
      ]}
    />
  );
};

export const TimeChartExample1 = () => {
  return (
    <TimeChart
      width={200}
      height={75}
      datasets={[
        {
          label: 'Dataset 1',
          data: [
            { x: '2014/01/01', y: 3 },
            { x: '2016/03/02', y: 7 },
            { x: '2018/07/05', y: 19 },
            { x: '2020/11/07', y: 12 }
          ],
          color: `${getCssVar('lc-color-primary')}`
        },
        {
          label: 'Dataset 2',
          data: [
            { x: '2014/01/01', y: 10 },
            { x: '2016/03/02', y: 5 },
            { x: '2018/07/05', y: 17 },
            { x: '2020/11/07', y: 24 }
          ],
          color: `${getCssVar('lc-color-accent')}`
        },
        {
          label: 'Dataset 3',
          data: [
            { x: '2014/01/01', y: 8 },
            { x: '2016/03/02', y: 12 },
            { x: '2018/07/05', y: 20 },
            { x: '2020/11/07', y: 4 }
          ],
          color: `${getCssVar('lc-color-success')}`
        },
        {
          label: 'Dataset 4',
          data: [
            { x: '2014/01/01', y: 23 },
            { x: '2016/03/02', y: 16 },
            { x: '2018/07/05', y: 13 },
            { x: '2020/11/07', y: 19 }
          ],
          color: `${getCssVar('lc-color-warning')}`
        },
        {
          label: 'Dataset 5',
          data: [
            { x: '2014/01/01', y: 13 },
            { x: '2016/03/02', y: 20 },
            { x: '2018/07/05', y: 4 },
            { x: '2020/11/07', y: 7 }
          ],
          color: `${getCssVar('lc-color-danger')}`
        }
      ]}
      // Note: You can set custom time options without affecting the other defaults
      options={{
        scales: {
          xAxes: [{ time: { unit: 'year', min: '2014/01/01' } }]
        }
      }}
    />
  );
};
