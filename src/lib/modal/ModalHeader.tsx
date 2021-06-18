import React, { FC } from 'react';

export interface ModalHeaderProps {
  title: string;
}

export const ModalHeader: FC<ModalHeaderProps> = ({ title, children }) => (
  <header className="lc-modal-header">
    <h2 className="lc-modal-title">{title}</h2>
    <span className="lc-modal-flex" />
    <div>{children}</div>
  </header>
);
