import React from 'react';
import { Menu, Icon, ButtonPrimary } from '../..';

export const MenuExample1 = () => {
  return (
    <div className="menu-story" style={{ height: '200px' }}>
      <Menu
        menuButton={(menuButtonProps: any) => (
          <ButtonPrimary {...menuButtonProps} icon={<Icon name="chevronDown" />} iconPlacement="end">
            Menu
          </ButtonPrimary>
        )}
        menuItems={[
          { name: 'menu-item', href: 'https://google.com', target: '_blank', children: 'Google' },
          { name: 'divider' },
          { name: 'sub-menu', label: 'Sub Menu', menuItems: [{ name: 'menu-item', children: 'Testing' }] },
          { name: 'divider' },
          {
            name: 'menu-item',
            endIcon: <Icon name="trash" />,
            children: 'Delete'
          },
          {
            name: 'menu-item',
            startIcon: <Icon name="trash" />,
            children: 'Delete'
          }
        ]}
      />
    </div>
  );
};

export const MenuExample2 = () => {
  return (
    <div className="menu-story" style={{ height: '200px' }}>
      <Menu
        hover
        menuButton={
          <ButtonPrimary icon={<Icon name="chevronDown" />} iconPlacement="end" onClick={() => alert('button clicked')}>
            Click for Action
          </ButtonPrimary>
        }
        menuItems={[
          { name: 'menu-item', href: 'https://google.com', target: '_blank', children: 'Google' },
          { name: 'divider' },
          { name: 'sub-menu', label: 'Sub Menu', menuItems: [{ name: 'menu-item', children: 'Testing' }] },
          { name: 'divider' },
          {
            name: 'menu-item',
            endIcon: <Icon name="trash" />,
            children: 'Delete'
          },
          {
            name: 'menu-item',
            startIcon: <Icon name="trash" />,
            children: 'Delete'
          }
        ]}
      />
    </div>
  );
};
