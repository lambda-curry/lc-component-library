import { PaginationProps as MuiPaginationProps } from '@material-ui/lab/Pagination';
import { FC } from 'react';
import './pagination.css';
export interface PaginationProps extends Omit<MuiPaginationProps, 'color' | 'variant' | 'count'> {
    className?: string;
    pagesCount: number;
}
export declare const Pagination: FC<PaginationProps>;
