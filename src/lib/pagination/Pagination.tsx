import MuiPagination, { PaginationProps as MuiPaginationProps } from '@material-ui/lab/Pagination';
import classNames from 'classnames';
import React, { FC, ReactElement } from 'react';
import './pagination.css';

export interface PaginationProps extends Omit<MuiPaginationProps, 'color' | 'variant' | 'count'> {
  className?: string;
  pagesCount: number;
}

export const Pagination: FC<PaginationProps> = ({ className, pagesCount, ...props }): ReactElement => {
  return (
    <MuiPagination className={classNames('lc-pagination', className)} count={pagesCount} variant="text" {...props} />
  );
};
