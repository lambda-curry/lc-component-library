import { FC } from 'react';
import './drawer.css';
export declare type DrawerAnchor = 'top' | 'left' | 'bottom' | 'right';
export interface DrawerProps {
    name: string;
    className?: string;
    options?: {
        anchor?: DrawerAnchor;
        width?: number;
    };
}
export declare const Drawer: FC<DrawerProps>;
