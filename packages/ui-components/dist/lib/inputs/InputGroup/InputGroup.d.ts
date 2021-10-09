import { FC, HTMLAttributes } from 'react';
import './input-group.css';
export interface InputGroupProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
}
export declare const InputGroup: FC<InputGroupProps>;
