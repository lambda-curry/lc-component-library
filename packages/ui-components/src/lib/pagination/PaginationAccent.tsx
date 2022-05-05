import React, { FC, PropsWithChildren, ReactElement } from 'react';
import MuiPagination from '@mui/material/Pagination';
import classNames from 'classnames';
import { PaginationProps } from './Pagination';
import './pagination.css';

export const PaginationAccent: FC<PropsWithChildren<PaginationProps>> = ({
  className,
  pagesCount,
  ...props
}): ReactElement => (
  <MuiPagination
    className={classNames('lc-pagination-accent', className)}
    count={pagesCount}
    variant="text"
    {...props}
  />
);
