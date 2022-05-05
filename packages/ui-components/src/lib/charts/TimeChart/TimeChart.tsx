import React, { FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import merge from 'lodash/merge';
import { ChartJSOptions, ChartTooltipComponent } from '../chart.helpers';
import { LineChart, LineChartProps } from '../LineChart/LineChart';
import { ChartLegend } from '../ChartLegend/ChartLegend';
import { ChartLabel } from '../ChartLabel/ChartLabel';
import moment from 'moment';

import './time-chart.css';

export interface TimeChartProps extends LineChartProps {}

export const TimeChart: FC<TimeChartProps> = ({ options, datasets = [], className, ...props }) => {
  const { datasetDisplayLimit = datasets.length } = options || {};
  const [visibleDatasets, setVisibleDatasets] = useState<LineChartProps['datasets']>(datasets);
  const [activeIndexes, setActiveIndexes] = useState(
    datasets.slice(0, datasetDisplayLimit).map((dataset, index) => index)
  );

  useEffect(() => {
    if (datasets && activeIndexes)
      setVisibleDatasets(
        datasets.map((dataset: any, index) => ({
          ...dataset,
          hidden: !activeIndexes.includes(index)
        }))
      );
  }, [activeIndexes, datasets]);

  const toggleDatasetVisibility = (index: number) => {
    if (index < 0) return;

    if (!activeIndexes.includes(index) && activeIndexes.length < datasetDisplayLimit)
      return setActiveIndexes([...activeIndexes, index]);

    setActiveIndexes([...activeIndexes.filter(activeIndex => activeIndex !== index)]);
  };

  const handleItemClick = (index: number) => toggleDatasetVisibility(index);

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
  const { color, datasetLabel, xLabel = '', value } = data;

  return (
    <div className="lc-chart-time-tooltip">
      <ChartLabel className="lc-chart-time-tooltip-label" color={color} label={datasetLabel} value={value} />
      {xLabel && <div className="lc-chart-time-tooltip-date">{moment(xLabel).format('ll')}</div>}
    </div>
  );
};
