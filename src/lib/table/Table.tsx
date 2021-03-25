import React, { FC, ReactNode, TableHTMLAttributes } from 'react';
import classNames from 'classnames';

import './table.css';

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  disclaimer?: ReactNode;
}

export const Table: FC<TableProps> = ({ className, disclaimer, ...props }) => (
  <>
    <div className={classNames('lc-table-wrapper', className)}>
      <table className="lc-table" {...props} />
    </div>
    {disclaimer && <div className="lc-table-disclaimer">{disclaimer}</div>}
  </>
);
