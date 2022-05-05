import React, { FC } from 'react';
import classNames from 'classnames';
import CardActions, { CardActionsProps } from '@mui/material/CardActions';

export interface ModalActionsProps extends CardActionsProps {}

export const ModalActions: FC<ModalActionsProps> = ({ className, ...props }) => (
  <CardActions className={classNames('lc-modal-actions', className)} {...props} />
);
