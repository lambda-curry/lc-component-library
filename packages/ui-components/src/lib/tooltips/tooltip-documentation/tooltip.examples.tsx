import React from 'react';
import { IconButton, Tooltip, useTooltip } from '../..';

export const TooltipExample1 = () => {
  return (
    <div className="icon-button-story">
      <Tooltip title="Sample Edit Tooltip">
        <IconButton icon="pencil" />
      </Tooltip>
    </div>
  );
};

export const TooltipExample2 = () => {
  const { tooltipOpen, handleTooltipOpen, handleTooltipClose } = useTooltip();
  const {
    tooltipOpen: tooltipOpen2,
    handleTooltipOpen: handleTooltipOpen2,
    handleTooltipClose: handleTooltipClose2
  } = useTooltip();

  return (
    <div className="icon-button-story">
      <Tooltip
        title="Open on click only"
        open={tooltipOpen}
        onClose={handleTooltipClose}
        options={{ openOnClick: true }}
      >
        <IconButton icon="question" onClick={handleTooltipOpen} />
      </Tooltip>
      <Tooltip
        title="When a users opens or loads a web page containing our marketing module. The session expires after 30 minutes of inactivity. If a user opens the same web page 30 minutes later, this is a new session."
        open={tooltipOpen2}
        onClose={handleTooltipClose2}
        options={{ openOnClick: true }}
      >
        <IconButton icon="question" onClick={handleTooltipOpen2} />
      </Tooltip>
    </div>
  );
};
