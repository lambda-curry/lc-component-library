import { ChartTooltipModel } from 'chart.js';
import React, { FC, HTMLAttributes, useEffect, useState } from 'react';
import { ChartRef } from '../chart.helpers';

import './chart-tooltip.css';

export interface ChartTooltipProps extends HTMLAttributes<HTMLDivElement> {
  model: ChartTooltipModel;
  chartRef: ChartRef;
  component?: (tooltip: ChartTooltipModel, chartRef: ChartRef) => React.ReactNode;
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
