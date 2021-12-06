import MuiPagination from '@mui/material/Pagination';
import classNames from 'classnames';
import React, { FC, ReactElement } from 'react';
import { PaginationProps } from './Pagination';
import './pagination.css';

export const PaginationOutline: FC<PaginationProps> = ({ className, pagesCount, ...props }): ReactElement => {
  return (
    <MuiPagination
      className={classNames('lc-pagination-outline', className)}
      count={pagesCount}
      variant="outlined"
      {...props}
    />
  );
};
