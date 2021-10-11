import MuiPagination from '@material-ui/lab/Pagination';
import classNames from 'classnames';
import React, { FC, ReactElement } from 'react';
import { PaginationProps } from './Pagination';
import './pagination.css';

export const PaginationAccent: FC<PaginationProps> = ({ className, pagesCount, ...props }): ReactElement => {
  return (
    <MuiPagination
      className={classNames('lc-pagination-accent', className)}
      count={pagesCount}
      variant="text"
      {...props}
    />
  );
};
