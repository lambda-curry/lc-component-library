import React from 'react';
import { PieChart } from '..';

export const PieChartExample1 = () => (
  <PieChart
    data={[
      { label: 'test1', value: 4, color: 'red' },
      { label: 'test2', value: 6, color: 'blue' }
    ]}
  />
);
