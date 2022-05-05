import React, { FC, PropsWithChildren, ReactElement } from 'react';
import MuiPagination from '@mui/material/Pagination';
import classNames from 'classnames';
import { PaginationProps } from './Pagination';
import './pagination.css';

export const PaginationOutline: FC<PropsWithChildren<PaginationProps>> = ({
  className,
  pagesCount,
  ...props
}): ReactElement => (
  <MuiPagination
    className={classNames('lc-pagination-outline', className)}
    count={pagesCount}
    variant="outlined"
    {...props}
  />
);
