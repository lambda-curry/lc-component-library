import React, { FC, HTMLAttributes } from 'react';
import { ChartJSData, ChartJSDataFunction, ChartLegendComponent, ChartRefObject } from '../chart.helpers';

// import './chart-legend.css';

export interface ChartLegendProps extends HTMLAttributes<HTMLDivElement> {
  data: ChartJSData | ChartJSDataFunction;
  chartRef: ChartRefObject;
  component?: ChartLegendComponent;
}

export const ChartLegend: FC<ChartLegendProps> = ({ data: chartJSData, chartRef, component, ...props }) => {
  const data =
    typeof chartJSData === 'function'
      ? chartJSData(chartRef.current?.chartInstance.canvas as HTMLElement)
      : chartJSData;

  console.log('>>>', data);

  return (
    <div className="lc-chart-legend" {...props}>
      {component ? (
        component(data)
      ) : (
        <>
          Default Legend
          {/* TODO: build out the default legend */}
        </>
      )}
    </div>
  );
};
