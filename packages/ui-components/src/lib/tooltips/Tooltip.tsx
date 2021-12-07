import React, { FC, useState } from 'react';
import MuiTooltip, { TooltipProps as MuiTooltipProps } from '@mui/material/Tooltip';
import { useOnClickOutside } from '../hooks';
import './tooltip.css';

export interface TooltipOptions {
  openOnClick?: boolean;
}
export interface TooltipProps extends MuiTooltipProps {
  options?: TooltipOptions;
}

export const useTooltip = () => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const handleTooltipOpen = (callback?: (() => void) | any) => {
    setTooltipOpen(true);
    if (typeof callback === 'function') callback();
  };
  const handleTooltipClose = (callback?: (() => void) | any) => {
    setTooltipOpen(false);
    if (typeof callback === 'function') callback();
  };
  useOnClickOutside(handleTooltipClose, '.lc-tooltip-wrapper, .MuiTooltip-popper');

  return { tooltipOpen, handleTooltipOpen, handleTooltipClose };
};

export const Tooltip: FC<TooltipProps> = ({
  className,
  children,
  placement = 'top',
  options = {} as TooltipOptions,
  ...props
}) => {
  const { openOnClick } = options;

  return (
    <MuiTooltip
      arrow
      placement={placement}
      disableFocusListener={openOnClick}
      disableHoverListener={openOnClick}
      disableTouchListener={openOnClick}
      {...props}
    >
      <span className="lc-tooltip-wrapper">{children}</span>
    </MuiTooltip>
  );
};
