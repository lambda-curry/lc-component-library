import { ChartTooltipModel } from 'chart.js';
import React, { FC, HTMLAttributes, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { ChartRefObject } from '../chart.helpers';

import './chart-tooltip.css';

export interface ChartTooltipProps extends HTMLAttributes<HTMLDivElement> {
  model: ChartTooltipModel;
  chartRef: ChartRefObject;
  component?: (tooltip: ChartTooltipModel, chartRef: ChartRefObject) => React.ReactNode;
}

export const ChartTooltip: FC<ChartTooltipProps> = ({ model: tooltipModel, chartRef, component, ...props }) => {
  // Note: setting the label in state, prevents the label from disappearing before the tooltip
  const [label, setLabel] = useState('');

  const chartElement = chartRef.current?.chartInstance.canvas?.getBoundingClientRect() as DOMRect;
  const positionTop = chartElement.top + window.pageYOffset + tooltipModel.caretY - 8;
  const positionLeft = chartElement.left + window.pageXOffset + tooltipModel.caretX;

  useEffect(() => {
    // TODO: I think we can utilize label callbacks to customize these better
    if (tooltipModel?.body) {
      const getBody = (bodyItem: any) => bodyItem.lines;
      const bodyLines = tooltipModel?.body.map(getBody);
      setLabel(bodyLines[0][0]);
    }
  }, [tooltipModel]);

  if (!tooltipModel || !chartRef?.current) return null;

  return (
    <div
      className="lc-chart-tooltip"
      style={{ top: positionTop, left: positionLeft, opacity: tooltipModel?.opacity || 0 }}
      {...props}
    >
      {component ? component(tooltipModel, chartRef) : label}
    </div>
  );
};

// Note: Abstracted from https://github.com/reactchartjs/react-chartjs-2/issues/151#issuecomment-470282163
export const renderChartTooltip = (
  tooltipModel: ChartTooltipModel,
  chartRef: ChartRefObject,
  tooltipComponent?: (tooltip: ChartTooltipModel, chartRef: ChartRefObject) => React.ReactNode
) => {
  let tooltipEl = document.getElementById('lc-chart-tooltip-wrapper');
  if (!tooltipEl) {
    tooltipEl = document.createElement('div');
    tooltipEl.id = 'lc-chart-tooltip-wrapper';
    document.body.appendChild(tooltipEl);
  }

  ReactDOM.render(<ChartTooltip model={tooltipModel} chartRef={chartRef} component={tooltipComponent} />, tooltipEl);
};
