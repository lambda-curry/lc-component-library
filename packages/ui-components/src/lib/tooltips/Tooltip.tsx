import React, { FC, useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Tooltip as MuiTooltip, TooltipProps as MuiTooltipProps } from '@material-ui/core';
import { useOnClickOutside } from '../hooks';

export interface TooltipOptions {
  openOnClick?: boolean;
}
export interface TooltipProps extends MuiTooltipProps {
  options?: TooltipOptions;
}

const useStyles = makeStyles((theme: Theme) => ({
  arrow: {
    color: theme.palette.common.black
  },
  tooltip: {
    fontFamily: 'var(--lc-font-family-sans)',
    backgroundColor: theme.palette.common.black,
    padding: '10px 12px 12px',
    fontSize: '13px'
  }
}));

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
  const styles = useStyles();

  const { openOnClick } = options;

  return (
    <MuiTooltip
      arrow
      classes={styles}
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
