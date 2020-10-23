import React, { FC, SVGProps, createContext } from 'react';

export const RegisteredIconContext = createContext<{
  [x: string]: FC<SVGProps<SVGSVGElement>>;
}>({});

export const IconRegistry: FC<{
  icons: { [x: string]: FC<SVGProps<SVGSVGElement>> };
}> = ({ icons, ...props }) => (
  <RegisteredIconContext.Provider value={icons} {...props} />
);
