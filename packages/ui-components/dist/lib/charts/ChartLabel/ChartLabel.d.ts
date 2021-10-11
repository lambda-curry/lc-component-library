import { FC } from 'react';
export interface ChartLabelProps {
    color?: string;
    label?: string | number;
    className?: string;
    value?: string | number;
}
export declare const ChartLabel: FC<ChartLabelProps>;
