import React, { FC, KeyboardEvent, MouseEvent } from 'react';
import { Drawer as MuiDrawer } from '@material-ui/core';
import classNames from 'classnames';
import './drawer.css';
import { DrawerType } from './drawer.helpers';
import { useDrawer } from './DrawerProvider';

export type DrawerAnchor = 'top' | 'left' | 'bottom' | 'right';

export interface DrawerProps {
  name: string;
  className?: string;
  options?: { anchor?: DrawerAnchor; width?: number };
}

const toggleDrawer: (
  name: string,
  toggleFunction: (drawer: DrawerType) => void
) => (event: KeyboardEvent | MouseEvent) => void = (name, toggleFunction) => event => {
  if (event.type === 'keydown' && ((event as KeyboardEvent).key === 'Tab' || (event as KeyboardEvent).key === 'Shift'))
    return;

  toggleFunction({ name });
};

export const Drawer: FC<DrawerProps> = ({ name, className, options: overrides, ...props }) => {
  const { drawerActions, drawerState } = useDrawer();
  const isOpen = drawerState.active === name;

  const options = {
    anchor: 'right' as DrawerAnchor,
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
