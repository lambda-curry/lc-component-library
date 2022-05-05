import React, { FC, ReactElement } from 'react';
import MuiPagination from '@mui/material/Pagination';
import classNames from 'classnames';
import { PaginationProps } from './Pagination';
import './pagination.css';

export const PaginationPrimary: FC<PaginationProps> = ({ className, pagesCount, ...props }): ReactElement => (
  <MuiPagination
    className={classNames('lc-pagination-primary', className)}
    count={pagesCount}
    variant="text"
    {...props}
  />
);
