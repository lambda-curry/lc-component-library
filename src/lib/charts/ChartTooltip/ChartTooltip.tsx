import { ChartTooltipModel } from 'chart.js';
import React, { FC, HTMLAttributes, useEffect, useRef, useState } from 'react';

import './chart-tooltip.css';

export interface ChartTooltipProps extends HTMLAttributes<HTMLDivElement> {
  model?: ChartTooltipModel;
  chartRef: any;
}

export const ChartTooltip: FC<ChartTooltipProps> = ({ model: tooltipModel, chartRef, ...props }) => {
  // Note: not sure if we'll need to utilize a tooltipElRef, but keeping for now
  // const tooltipElRef = useRef<HTMLDivElement>(null);

  // Note: setting the label in state, prevents the label from disappearing before the tooltip
  const [label, setLabel] = useState('');

  const chartElement = chartRef.current.chartInstance.canvas.getBoundingClientRect();
  const positionTop = chartElement.top + window.pageYOffset + tooltipModel?.caretY - 8;
  const positionLeft = chartElement.left + window.pageXOffset + tooltipModel?.caretX;

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
      // ref={tooltipElRef}
      className="lc-chart-tooltip"
      style={{ top: positionTop, left: positionLeft, opacity: tooltipModel?.opacity || 0 }}
      {...props}
    >
      {label}
    </div>
  );
};
