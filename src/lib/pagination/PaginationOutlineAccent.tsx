import MuiPagination from '@material-ui/lab/Pagination';
import classNames from 'classnames';
import React, { FC, ReactElement } from 'react';
import { PaginationProps } from './Pagination';
import './pagination.css';

export const PaginationOutlineAccent: FC<PaginationProps> = ({ className, pagesCount, ...props }): ReactElement => {
  return (
    <MuiPagination
      className={classNames('lc-pagination-outline-accent', className)}
      count={pagesCount}
      variant="outlined"
      {...props}
    />
  );
};
