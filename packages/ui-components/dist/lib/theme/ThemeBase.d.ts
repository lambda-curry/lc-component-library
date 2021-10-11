import { FC, ReactNode } from 'react';
import '../../styles/index.css';
export interface ThemeBaseProps {
    as?: keyof JSX.IntrinsicElements;
    children: ReactNode;
    className?: string;
}
export declare const ThemeBase: FC<ThemeBaseProps>;
