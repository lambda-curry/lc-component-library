import React, { FC, HTMLAttributes, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { ChartTooltipModel } from 'chart.js';
import { ChartRefObject, ChartTooltipComponent } from '../chart.helpers';

import './chart-tooltip.css';
import classNames from 'classnames';

export interface ChartTooltipProps extends HTMLAttributes<HTMLDivElement> {
  model: ChartTooltipModel;
  chartRef: ChartRefObject;
  component?: ChartTooltipComponent;
}

export const ChartTooltip: FC<ChartTooltipProps> = ({ model, chartRef, component, ...props }) => {
  // Note: setting the label in state, prevents the label from disappearing before the tooltip
  const [tooltipModel, setTooltipModal] = useState<ChartTooltipModel>();

  useEffect(() => {
    if (model.opacity) setTooltipModal(model);
  }, [model]);

  if (!tooltipModel || !chartRef?.current) return null;

  const chartElement = chartRef.current?.chartInstance.canvas?.getBoundingClientRect() as DOMRect;
  const positionTop = chartElement.top + window.pageYOffset + tooltipModel.caretY - 8;
  const positionLeft = chartElement.left + window.pageXOffset + tooltipModel.caretX;

  const getLabel = ({ body }: ChartTooltipModel) => {
    const getBody = (bodyItem: any) => bodyItem.lines;
    const bodyLines = body.map(getBody);
    return bodyLines[0][0];
  };

  const getLabelColor = ({ labelColors }: ChartTooltipModel) => {
    if (!labelColors || !labelColors[0]) return false;
    return (labelColors[0] as any).backgroundColor;
  };

  return (
    <div
      className={classNames('lc-chart-tooltip', { loaded: model?.opacity })}
      style={{ top: positionTop, left: positionLeft }}
      {...props}
    >
      {component ? (
        component(tooltipModel, chartRef)
      ) : (
        <>
          <div className="lc-chart-tooltip-color" style={{ backgroundColor: getLabelColor(tooltipModel) }}></div>
          {getLabelColor(tooltipModel) && <div className="lc-chart-tooltip-label">{getLabel(tooltipModel)}</div>}
        </>
      )}
    </div>
  );
};

// Note: Abstracted from https://github.com/reactchartjs/react-chartjs-2/issues/151#issuecomment-470282163
export const renderChartTooltip = (
  tooltipModel: ChartTooltipModel,
  chartRef: ChartRefObject,
  tooltipComponent?: ChartTooltipComponent
) => {
  let tooltipEl = document.getElementById('lc-chart-tooltip-wrapper');
  if (!tooltipEl) {
    tooltipEl = document.createElement('div');
    tooltipEl.id = 'lc-chart-tooltip-wrapper';
    document.body.appendChild(tooltipEl);
  }

  ReactDOM.render(<ChartTooltip model={tooltipModel} chartRef={chartRef} component={tooltipComponent} />, tooltipEl);
};
