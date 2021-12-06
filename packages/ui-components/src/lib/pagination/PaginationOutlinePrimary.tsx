import MuiPagination from '@mui/material/Pagination';
import classNames from 'classnames';
import React, { FC, ReactElement } from 'react';
import { PaginationProps } from './Pagination';
import './pagination.css';

export const PaginationOutlinePrimary: FC<PaginationProps> = ({ className, pagesCount, ...props }): ReactElement => {
  return (
    <MuiPagination
      className={classNames('lc-pagination-outline-primary', className)}
      count={pagesCount}
      variant="outlined"
      {...props}
    />
  );
};
