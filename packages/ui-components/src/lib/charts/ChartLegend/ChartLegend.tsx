import React, { FC } from 'react';
import classNames from 'classnames';

import { ChartJSData, ChartLegendComponentProps } from '../chart.helpers';
import { ChartLegendItem } from './ChartLegendItem';

export const ChartLegend: FC<ChartLegendComponentProps> = ({ data, interactive, onItemClick }) => {
  // TODO: Add support for pie charts

  const { datasets } = data as ChartJSData;

  if (!datasets) return null;

  return (
    <ul className={classNames('lc-chart-legend', { 'lc-chart-legend-interactive': interactive })}>
      {datasets &&
        datasets.map(({ label, borderColor, backgroundColor, pointBackgroundColor, hidden }, index) => {
          const color = backgroundColor || pointBackgroundColor || borderColor;

          return (
            <ChartLegendItem
              key={index}
              index={index}
              color={color as string}
              label={label}
              onClick={onItemClick}
              active={!hidden}
              interactive={interactive}
            />
          );
        })}
    </ul>
  );
};
