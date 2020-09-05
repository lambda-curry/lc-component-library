import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { CardActions } from '@material-ui/core';

export const ModalActions: FunctionComponent<any> = ({ className, ...props }) => (
    <CardActions className={classNames('modal-actions', className)} {...props} />
);
