import React from 'react';
import { Menu, Icon, ButtonPrimary, IconButton } from '../..';

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
  // padding left is to show off the align end
  return (
    <div className="menu-story" style={{ height: '200px', paddingLeft: '100px' }}>
      <Menu
        hover
        align="end"
        menuButton={
          <ButtonPrimary icon={<Icon name="chevronDown" />} iconPlacement="end" onClick={() => alert('button clicked')}>
            Click me
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

export const MenuExample3 = () => {
  return (
    <div className="menu-story" style={{ height: '200px' }}>
      <Menu
        menuButton={<IconButton icon="threeDots" />}
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
