import { FC } from 'react';
import { DefaultIconNames } from './Icon';
export interface DecorativeIconProps {
    className?: string;
    color: string;
    name: DefaultIconNames | string;
}
export declare const DecorativeIcon: FC<DecorativeIconProps>;
