import { Drawer as MuiDrawer } from '@material-ui/core';
import React from 'react';
import './drawer.css';
import { DrawerType } from './drawer.helpers';
import { useDrawer } from './DrawerProvider';

const toggleDrawer: (
  name: string,
  toggleFunction: (drawer: DrawerType) => void
) => (event: React.KeyboardEvent | React.MouseEvent) => void = (name, toggleFunction) => event => {
  if (
    event.type === 'keydown' &&
    ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
  )
    return;

  toggleFunction({ name });
};

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export interface DrawerProps {
  name: string;
  options?: { anchor?: Anchor; minWidth: number };
}

export const Drawer: React.FC<DrawerProps> = ({ name, children, options: overrides }) => {
  const options = {
    anchor: 'right' as Anchor,
    width: 300,
    ...overrides
  };

  const { drawerActions, drawerState } = useDrawer();

  const isOpen = drawerState.active === name;

  return (
    <MuiDrawer
      className="lc-drawer"
      anchor={options.anchor}
      open={isOpen}
      onClose={toggleDrawer(name, drawerActions.toggleDrawer)}
    >
      <div className="lc-drawer-content" style={{ width: `${options.width}px` }}>
        {children}
      </div>
    </MuiDrawer>
  );
};
