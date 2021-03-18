import React, { FC, HTMLAttributes, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { ChartTooltipModel } from 'chart.js';
import { ChartJSData, ChartJSDataFunction, ChartRefObject, ChartTooltipComponent } from '../chart.helpers';

import './chart-tooltip.css';

export interface ChartTooltipProps extends HTMLAttributes<HTMLDivElement> {
  data: ChartJSData | ChartJSDataFunction;
  model: Omit<ChartTooltipModel, 'labelColors'> & { labelColors: any[] };
  chartRef: ChartRefObject;
  component?: ChartTooltipComponent;
}

export const ChartTooltip: FC<ChartTooltipProps> = ({ data, model, chartRef, component, ...props }) => {
  // Note: setting the label in state, prevents the label from disappearing before the tooltip
  const [label, setLabel] = useState('');

  const chartElement = chartRef.current?.chartInstance.canvas?.getBoundingClientRect() as DOMRect;
  const positionTop = chartElement.top + window.pageYOffset + model.caretY - 8;
  const positionLeft = chartElement.left + window.pageXOffset + model.caretX;

  useEffect(() => {
    // TODO: I think we can utilize label callbacks to customize these better
    if (model?.body) {
      const getBody = (bodyItem: any) => bodyItem.lines;
      const bodyLines = model?.body.map(getBody);
      setLabel(bodyLines[0][0]);
    }
  }, [model]);

  if (!model || !chartRef?.current) return null;

  return (
    <div
      className="lc-chart-tooltip"
      style={{ top: positionTop, left: positionLeft, opacity: model?.opacity || 0 }}
      {...props}
    >
      <div className="lc-chart-tooltip-content">
        <span
          className="lc-chart-tooltip-label-color"
          // style={{ backgroundColor: model?.labelColors[0]?.backgroundColor }}
        />
        {component ? component({ model, chartRef }) : label}
      </div>
    </div>
  );
};

export type RenderChartTooltipProps = (props: ChartTooltipProps) => void;

// Note: Abstracted from https://github.com/reactchartjs/react-chartjs-2/issues/151#issuecomment-470282163
export const renderChartTooltip: RenderChartTooltipProps = props => {
  let tooltipEl = document.getElementById('lc-chart-tooltip-wrapper');
  if (!tooltipEl) {
    tooltipEl = document.createElement('div');
    tooltipEl.id = 'lc-chart-tooltip-wrapper';
    document.body.appendChild(tooltipEl);
  }

  ReactDOM.render(<ChartTooltip {...props} />, tooltipEl);
};
