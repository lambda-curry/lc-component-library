import React, { FunctionComponent } from 'react';

export interface ModalHeaderProps {
  title: string;
}

export const ModalHeader: FunctionComponent<ModalHeaderProps> = ({ title, children }) => (
  <header className="modal-header">
    <h2 className="modal-title">{title}</h2>
    <span className="lc-flex-1" />
    <div>{children}</div>
  </header>
);
