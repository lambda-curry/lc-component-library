import React, { FC } from 'react';
export interface ChartLegendItemProps {
    index: number;
    color: string;
    label?: string;
    value?: string | number;
    active?: boolean;
    interactive?: boolean;
    onClick?: (event: React.MouseEvent<any, MouseEvent>, index: number) => void;
}
export declare const ChartLegendItem: FC<ChartLegendItemProps>;
