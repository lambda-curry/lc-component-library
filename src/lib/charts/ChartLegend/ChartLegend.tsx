import React, { FC, HTMLAttributes } from 'react';
import { ChartJSData, ChartLegendComponent } from '../chart.helpers';

// import './chart-legend.css';

export interface ChartLegendProps extends HTMLAttributes<HTMLDivElement> {
  data: ChartJSData;
  legend?: ChartLegendComponent;
}

export const ChartLegend: FC<ChartLegendProps> = ({ data, legend, ...props }) => {
  return (
    <div className="lc-chart-legend" {...props}>
      {legend ? (
        legend(data)
      ) : (
        <>
          Default Legend
          {/* TODO: build out the default legend */}
        </>
      )}
    </div>
  );
};
