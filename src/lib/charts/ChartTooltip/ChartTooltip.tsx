import { ChartTooltipModel } from 'chart.js';
import React, { FC, HTMLAttributes, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import './chart-tooltip.css';

export interface ChartTooltipProps extends HTMLAttributes<HTMLDivElement> {
  model?: ChartTooltipModel;
  chartRef: any;
}

export const ChartTooltip: FC<ChartTooltipProps> = ({ model: tooltipModel, chartRef, ...props }) => {
  // TODO: Need to detect if the root already exists in the document before creating a new one.
  // Right now, this is creating a `#lc-chart-tooltip-root` element for each chart.
  const tooltipRootElement = document.createElement('div');
  tooltipRootElement.setAttribute('id', 'lc-chart-tooltip-root');
  const [tooltipRoot] = useState(tooltipRootElement);
  let label = '';

  // TODO: Need to use the mouse position to hide the tooltip for pie graph
  // because it's not hiding on its own.

  useEffect(() => {
    document.body.appendChild(tooltipRoot);

    return () => {
      document.body.removeChild(tooltipRoot);
    };
  }, []);

  if (!tooltipRoot || !tooltipModel || !chartRef?.current) return null;

  const position = chartRef.current.chartInstance.canvas.getBoundingClientRect();
  const positionTop = position.top + window.pageYOffset + tooltipModel.caretY;
  const positionLeft = position.left + window.pageXOffset + tooltipModel.caretX;

  const getBody = (bodyItem: any) => bodyItem.lines;

  // Set custom tooltip label
  if (tooltipModel.body) {
    const bodyLines = tooltipModel.body.map(getBody);
    label = bodyLines[0][0];
  }

  return (
    <>
      {createPortal(
        <div
          className="lc-chart-tooltip"
          style={{ top: positionTop, left: positionLeft, opacity: tooltipModel?.opacity || 0 }}
          {...props}
        >
          {label}
        </div>,
        tooltipRoot
      )}
    </>
  );
};
