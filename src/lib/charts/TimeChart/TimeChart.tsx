import React, { FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import { merge } from 'lodash';
import { ChartJSOptions, ChartTooltipComponent } from '../chart.helpers';
import { LineChart, LineChartProps } from '../LineChart/LineChart';
import { ChartLegend } from '../ChartLegend/ChartLegend';
import { ChartLabel } from '../ChartLabel/ChartLabel';
import moment from 'moment';

import './time-chart.css';

export interface TimeChartProps extends LineChartProps {}

export const TimeChart: FC<TimeChartProps> = ({ options, datasets, className, ...props }) => {
  const { datasetDisplayLimit = 3 } = options || {};

  const [activeIndexes, setActiveIndexes] = useState(
    datasets?.slice(0, datasetDisplayLimit).map((dataset, index) => index)
  );
  const [visibleDatasets, setVisibleDatasets] = useState<LineChartProps['datasets']>(datasets);

  useEffect(() => {
    if (datasets && activeIndexes)
      setVisibleDatasets(
        datasets.map((dataset: any, index) => ({
          ...dataset,
          hidden: !activeIndexes.includes(index)
        }))
      );
  }, [activeIndexes, datasets]);

  const activateDataset = (index: number) => {
    if (index < 0 || !activeIndexes) return;
    if (activeIndexes.includes(index)) return;
    setActiveIndexes([...activeIndexes.slice(1), index]);
  };

  const handleItemClick = (index: number) => activateDataset(index);

  const defaultOptions: ChartJSOptions = {
    scales: {
      xAxes: [
        {
          type: 'time',
          time: {
            minUnit: 'day',
            round: 'day'
          }
        }
      ]
    }
  };

  return (
    <LineChart
      datasets={visibleDatasets}
      className={classNames('lc-chart-time', className)}
      options={merge(defaultOptions, options)}
      tooltipComponent={TimeChartTooltip}
      legendComponent={legendProps => (
        <ChartLegend {...legendProps} interactive={true} onItemClick={(event, index) => handleItemClick(index)} />
      )}
      {...props}
    />
  );
};

const TimeChartTooltip: ChartTooltipComponent = ({ data }) => {
  const { color = '', datasetLabel = '', xLabel = '' } = data;

  return (
    <div className="lc-chart-time-tooltip">
      <ChartLabel className="lc-chart-time-tooltip-label" color={color} label={datasetLabel} />
      {xLabel && <div className="lc-chart-time-tooltip-date">{moment(xLabel).format('ll')}</div>}
    </div>
  );
};
