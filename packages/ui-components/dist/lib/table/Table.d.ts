import { FC, ReactNode, TableHTMLAttributes } from 'react';
import './table.css';
export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
    className?: string;
    footnote?: ReactNode;
}
export declare const Table: FC<TableProps>;
