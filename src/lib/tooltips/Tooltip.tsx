import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Tooltip as MuiTooltip, TooltipProps } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  arrow: {
    color: theme.palette.common.black
  },
  tooltip: {
    backgroundColor: theme.palette.common.black
  }
}));

export const Tooltip: React.FC<TooltipProps> = ({ className, children, placement = 'top', ...props }) => (
  <MuiTooltip arrow classes={useStyles()} placement={placement} {...props}>
    <span className="tooltip-wrapper">{children}</span>
  </MuiTooltip>
);
