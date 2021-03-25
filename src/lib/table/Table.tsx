import React, { FC, ReactNode, TableHTMLAttributes } from 'react';
import classNames from 'classnames';

import './table.css';

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  className?: string;
  footnote?: ReactNode;
}

export const Table: FC<TableProps> = ({ className, footnote, ...props }) => (
  <>
    <div className={classNames('lc-table-wrapper', className)}>
      <table className="lc-table" {...props} />
    </div>
    {footnote && <div className="lc-table-footnote">{footnote}</div>}
  </>
);
