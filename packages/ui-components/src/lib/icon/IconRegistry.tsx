import React, { FC, createContext, PropsWithChildren } from 'react';
import { IconsMap } from './Icon';
import './icon.css';

export const RegisteredIconContext = createContext<IconsMap>({});

export interface IconRegistryProps {
  icons: IconsMap;
}

export const IconRegistry: FC<PropsWithChildren<IconRegistryProps>> = ({ icons, ...props }) => (
  <RegisteredIconContext.Provider value={icons} {...props} />
);
