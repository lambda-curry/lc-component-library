import React from 'react';
import { Drawer as MuiDrawer } from '@material-ui/core';
import classNames from 'classnames';
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
  className?: string;
  options?: { anchor?: Anchor; width?: number };
}

export const Drawer: React.FC<DrawerProps> = ({ name, className, options: overrides, ...props }) => {
  const { drawerActions, drawerState } = useDrawer();
  const isOpen = drawerState.active === name;

  const options = {
    anchor: 'right' as Anchor,
    width: 320,
    ...overrides
  };

  return (
    <MuiDrawer
      className={classNames('lc-drawer', className)}
      anchor={options.anchor}
      open={isOpen}
      onClose={toggleDrawer(name, drawerActions.toggleDrawer)}
      PaperProps={{ className: 'lc-drawer-content', style: { width: `${options.width}px` } }}
      {...props}
    />
  );
};
