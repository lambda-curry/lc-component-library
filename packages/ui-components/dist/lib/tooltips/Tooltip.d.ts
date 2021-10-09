import { FC } from 'react';
import { TooltipProps as MuiTooltipProps } from '@material-ui/core';
export interface TooltipOptions {
    openOnClick?: boolean;
}
export interface TooltipProps extends MuiTooltipProps {
    options?: TooltipOptions;
}
export declare const useTooltip: () => {
    tooltipOpen: boolean;
    handleTooltipOpen: (callback?: (() => void) | any) => void;
    handleTooltipClose: (callback?: (() => void) | any) => void;
};
export declare const Tooltip: FC<TooltipProps>;
