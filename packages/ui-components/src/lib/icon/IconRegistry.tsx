import React, { FC, createContext, PropsWithChildren } from 'react';
import { IconsMap } from './Icon';
import './icon.css';

export const RegisteredIconContext = createContext<IconsMap>({});

export interface IconRegistryProps extends PropsWithChildren<unknown> {
  icons: IconsMap;
}

export const IconRegistry: FC<IconRegistryProps> = ({ icons, ...props }) => (
  <RegisteredIconContext.Provider value={icons} {...props} />
);
