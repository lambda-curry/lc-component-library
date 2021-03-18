import React, { FC, HTMLAttributes, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { ChartTooltipModel, ChartType } from 'chart.js';
import { ChartJSData, ChartRefObject, ChartTooltipComponent, ChartTooltipData } from '../chart.helpers';
import { ChartLabel } from '../ChartLabel/ChartLabel';

export interface ChartTooltipProps extends HTMLAttributes<HTMLDivElement> {
  type: ChartType;
  data: ChartJSData;
  model: Omit<ChartTooltipModel, 'labelColors'> & { labelColors: any[] };
  chartRef: ChartRefObject;
  component?: ChartTooltipComponent;
}

export const ChartTooltip: FC<ChartTooltipProps> = ({
  type,
  data: chartData,
  model,
  chartRef,
  component,
  ...props
}) => {
  // Note: setting the data in state, prevents the data from disappearing before the tooltip
  const [tooltipData, setTooltipData] = useState<ChartTooltipData>({});

  const chartElement = chartRef.current?.chartInstance.canvas?.getBoundingClientRect() as DOMRect;
  const positionTop = chartElement.top + window.pageYOffset + model.caretY - 8;
  const positionLeft = chartElement.left + window.pageXOffset + model.caretX;

  const updateTooltipDataForPieCharts = () => {
    if (!model || !model.dataPoints || !chartData.labels || !chartData.datasets) return;
    if (!chartData.datasets[0].data) return;

    const { index = -1, ...newTooltipData } = model.dataPoints[0];

    const color = (model?.labelColors && model?.labelColors[0].backgroundColor) || '';
    const datasetLabel = chartData.labels[index] as string;
    const value = chartData.datasets[0].data[index] as number;

    setTooltipData({ ...newTooltipData, datasetLabel, color, value });
  };

  const updateTooltipData = () => {
    if (!model || !model.dataPoints) return;

    const { index, ...newTooltipData } = model.dataPoints[0];

    if (typeof newTooltipData.datasetIndex !== 'number') return;

    const color = (model?.labelColors && model?.labelColors[0].backgroundColor) || '';
    const datasetLabel = chartData.datasets ? chartData.datasets[newTooltipData.datasetIndex].label : '';

    setTooltipData({ ...newTooltipData, datasetLabel, color });
  };

  useEffect(() => {
    if (['pie', 'doughnut'].includes(type)) updateTooltipDataForPieCharts();
    else updateTooltipData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [model, chartData]);

  const { datasetLabel, color, value } = tooltipData;

  return (
    <div
      className={classNames('lc-chart-tooltip', { 'lc-chart-tooltip-loaded': model?.opacity })}
      style={{ top: positionTop, left: positionLeft }}
      {...props}
    >
      <div className="lc-chart-tooltip-content">
        {component ? (
          component({ data: tooltipData, chartRef })
        ) : (
          <ChartLabel color={color} label={datasetLabel} value={value} />
        )}
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
