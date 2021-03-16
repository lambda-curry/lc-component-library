import React, { FC, HTMLAttributes } from 'react';
import { ChartJSData, ChartJSDataFunction, ChartLegendComponent, ChartRefObject } from '../chart.helpers';

// import './chart-legend.css';

export interface ChartLegendProps extends HTMLAttributes<HTMLDivElement> {
  data: ChartJSData | ChartJSDataFunction;
  chartRef: ChartRefObject;
  component?: ChartLegendComponent;
}

export const ChartLegend: FC<ChartLegendProps> = ({ data, chartRef, component, ...props }) => {
  return (
    <div className="lc-chart-legend" {...props}>
      {component ? (
        component(typeof data === 'function' ? data(chartRef.current?.chartInstance.canvas as HTMLElement) : data)
      ) : (
        <>
          Default Legend
          {/* TODO: build out the default legend */}
        </>
      )}
    </div>
  );
};
