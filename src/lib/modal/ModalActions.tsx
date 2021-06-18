import React, { FC } from 'react';
import classNames from 'classnames';
import { CardActions, CardActionsProps } from '@material-ui/core';

export interface ModalActionsProps extends CardActionsProps {}

export const ModalActions: FC<ModalActionsProps> = ({ className, ...props }) => (
  <CardActions className={classNames('lc-modal-actions', className)} {...props} />
);
