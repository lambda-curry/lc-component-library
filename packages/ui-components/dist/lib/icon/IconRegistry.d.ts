import React, { FC } from 'react';
import { IconsMap } from './Icon';
import './icon.css';
export declare const RegisteredIconContext: React.Context<IconsMap>;
export interface IconRegistryProps {
    icons: IconsMap;
}
export declare const IconRegistry: FC<IconRegistryProps>;
