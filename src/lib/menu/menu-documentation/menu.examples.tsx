import React from 'react';
import { Menu } from '../..';
import { ButtonPrimary } from '../../buttons';

export const MenuExample1 = () => {
  return (
    <div className="menu-story">
      <Menu
        menuButton={<ButtonPrimary>Menu</ButtonPrimary>}
        menuItems={[
          { name: 'menu-item', href: 'https://google.com', target: '_blank', children: 'Google' },
          { name: 'divider' },
          { name: 'sub-menu', label: 'Sub Menu', menuItems: [{ name: 'menu-item', children: 'Testing' }] },
          { name: 'divider' },
          { name: 'menu-item', children: <ButtonPrimary>Test</ButtonPrimary> }
        ]}
      />
    </div>
  );
};
