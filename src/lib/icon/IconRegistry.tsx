import React from 'react';

export const RegisteredIconContext = React.createContext<{
  [x: string]: React.SFC<React.SVGProps<SVGSVGElement>>;
}>({});

export const IconRegistry: React.FC<{
  icons: { [x: string]: React.SFC<React.SVGProps<SVGSVGElement>> };
}> = ({ icons, ...props }) => (
  <RegisteredIconContext.Provider value={icons} {...props} />
);
