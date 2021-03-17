import React, { FC, createRef, useEffect, useState } from 'react';
import classNames from 'classnames';
import { ChartTooltipModel, ChartType } from 'chart.js';
import ChartComponent, { ChartComponentProps } from 'react-chartjs-2';
import { renderChartTooltip } from './ChartTooltip/ChartTooltip';
import { merge } from 'lodash';
import {
  ChartJSData,
  ChartJSOptions,
  ChartRefComponent,
  ChartTooltipComponent,
  ChartLegendComponent,
  ChartJSDataFunction
} from './chart.helpers';
import { ChartLegend } from './ChartLegend/ChartLegend';
import { useWindowSize } from '../hooks';

export interface ChartBaseProps extends Omit<ChartComponentProps, 'data'> {
  chartJSData: ChartJSData | ChartJSDataFunction;
  className?: string;
  options?: ChartJSOptions;
  tooltipComponent?: ChartTooltipComponent;
  legendComponent?: ChartLegendComponent;
  type?: ChartType;
}

export const ChartBase: FC<ChartBaseProps> = ({
  options,
  chartJSData: data,
  className,
  tooltipComponent,
  legendComponent,
  ...props
}) => {
  const chartRef = createRef<ChartRefComponent>();

  const baseOptions: ChartJSOptions = {
    legend: {
      display: !!legendComponent
    },
    tooltips: {
      enabled: false,
      custom: (tooltipModel: ChartTooltipModel) => renderChartTooltip(tooltipModel, chartRef, tooltipComponent)
    },
    plugins: {
      datalabels: {
        display: false
      }
    }
  };

  const windowSize = useWindowSize();
  const [chartWidth, setChartWidth] = useState<'0' | '100%'>('100%');

  useEffect(() => {
    setChartWidth('0');
    setTimeout(() => setChartWidth('100%'));
  }, [windowSize]);

  return (
    <div className={classNames('lc-chart', className)}>
      <div className="lc-chart-canvas-wrapper" style={{ position: 'relative', width: chartWidth }}>
        <ChartComponent ref={chartRef} data={data} options={merge(baseOptions, options)} {...props} />
      </div>
      <ChartLegend type={props.type} chartRef={chartRef} data={data} component={legendComponent} />
    </div>
  );
};
