import classNames from 'classnames';
import React, { FC } from 'react';

export interface ChartLabelProps {
  color?: string;
  label?: string | number;
  className?: string;
  value?: any;
}

export const ChartLabel: FC<ChartLabelProps> = ({ color, label, value, className, ...props }) => (
  <span className={classNames('lc-chart-label', className)} {...props}>
    {color && <span className="lc-chart-label-color" style={{ backgroundColor: color }} />}
    {label && <span className="lc-chart-label-content">{label}</span>}
    {value && <span className="lc-chart-label-value">{value}</span>}
  </span>
);
