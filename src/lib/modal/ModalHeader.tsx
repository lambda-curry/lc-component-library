import React, { FC, HTMLAttributes } from 'react';
import classNames from 'classnames';

export interface ModalHeaderProps extends HTMLAttributes<HTMLElement> {
  title: string;
}

export const ModalHeader: FC<ModalHeaderProps> = ({ title, className, children, ...props }) => (
  <header className={classNames('lc-modal-header', className)} {...props}>
    <h2 className="lc-modal-title">{title}</h2>
    <span className="lc-modal-flex" />
    <div>{children}</div>
  </header>
);
