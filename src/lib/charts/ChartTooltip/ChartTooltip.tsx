import React, { FC, HTMLAttributes, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { ChartTooltipModel } from 'chart.js';
import { ChartJSData, ChartRefObject, ChartTooltipComponent, TooltipData } from '../chart.helpers';
import { ChartLabel } from '../ChartLabel/ChartLabel';

export interface ChartTooltipProps extends HTMLAttributes<HTMLDivElement> {
  data: ChartJSData;
  model: Omit<ChartTooltipModel, 'labelColors'> & { labelColors: any[] };
  chartRef: ChartRefObject;
  component?: ChartTooltipComponent;
}

export const ChartTooltip: FC<ChartTooltipProps> = ({ data: chartData, model, chartRef, component, ...props }) => {
  // Note: setting the data in state, prevents the data from disappearing before the tooltip
  const [tooltipData, setTooltipData] = useState<TooltipData>({});

  const chartElement = chartRef.current?.chartInstance.canvas?.getBoundingClientRect() as DOMRect;
  const positionTop = chartElement.top + window.pageYOffset + model.caretY - 8;
  const positionLeft = chartElement.left + window.pageXOffset + model.caretX;

  useEffect(() => {
    const updateTooltipData = () => {
      if (!model || !model.dataPoints) return;

      const { index, ...newTooltipData } = model.dataPoints[0];

      if (typeof newTooltipData.datasetIndex !== 'number') return;

      const color = (model?.labelColors && model?.labelColors[0].backgroundColor) || '';
      const datasetLabel = chartData.datasets ? chartData.datasets[newTooltipData.datasetIndex].label : '';

      setTooltipData({ ...newTooltipData, datasetLabel, color });
    };

    updateTooltipData();
  }, [model, chartData]);

  if (!model || !chartRef?.current) return null;

  const { label = '', color = '' } = tooltipData;

  return (
    <div
      className="lc-chart-tooltip"
      style={{ top: positionTop, left: positionLeft, opacity: model?.opacity || 0 }}
      {...props}
    >
      <div className="lc-chart-tooltip-content">
        {component ? component({ data: tooltipData, chartRef }) : <ChartLabel color={color} label={label} />}
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
