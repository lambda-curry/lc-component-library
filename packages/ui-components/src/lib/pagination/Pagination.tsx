import React, { FC, ReactElement } from 'react';
import MuiPagination, { PaginationProps as MuiPaginationProps } from '@mui/material/Pagination';
import classNames from 'classnames';
import './pagination.css';

export interface PaginationProps extends Omit<MuiPaginationProps, 'color' | 'variant' | 'count'> {
  className?: string;
  pagesCount: number;
}

export const Pagination: FC<PaginationProps> = ({ className, pagesCount, ...props }): ReactElement => (
  <MuiPagination className={classNames('lc-pagination', className)} count={pagesCount} variant="text" {...props} />
);
