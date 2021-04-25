import React, { useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Tooltip as MuiTooltip, TooltipProps as MuiTooltipProps } from '@material-ui/core';
import { useOnClickOutside } from '../hooks';

const useStyles = makeStyles((theme: Theme) => ({
  arrow: {
    color: theme.palette.common.black
  },
  tooltip: {
    backgroundColor: theme.palette.common.black
  }
}));

interface TooltipOptions {
  openOnClick?: boolean;
}
interface TooltipProps extends MuiTooltipProps {
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
  useOnClickOutside(handleTooltipClose, '.MuiTooltip-popper');

  return { tooltipOpen, handleTooltipOpen, handleTooltipClose };
};

export const Tooltip: React.FC<TooltipProps> = ({
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
      <span className="tooltip-wrapper">{children}</span>
    </MuiTooltip>
  );
};
