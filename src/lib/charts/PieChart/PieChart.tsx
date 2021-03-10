import React from 'react';
import { Pie, ChartData } from 'react-chartjs-2';

export const PieChart: React.FC<{ data: ChartData<Chart.ChartData> }> = props => {
  return <Pie {...props} />;
};
