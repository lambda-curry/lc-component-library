import React from 'react';
import {
  Menu as RCMenu,
  MenuItem,
  MenuItemProps as RCMenuItemProps,
  MenuProps as RCMenuProps,
  MenuDivider,
  SubMenu,
  SubMenuProps as RSSubMenuProps
} from '@szhsin/react-menu';
import './menu.css';

export type MenuItems = (MenuItemProps | MenuDividerProps | SubMenuProps)[];

interface MenuItemProps extends RCMenuItemProps {
  name: 'menu-item';
  startIcon?: React.ReactElement;
  endIcon?: React.ReactElement;
}

interface MenuDividerProps {
  name: 'divider';
  className?: string;
  style?: any;
  children?: undefined;
}

interface SubMenuProps extends RSSubMenuProps {
  name: 'sub-menu';
  menuItems: MenuItems;
  children?: undefined;
}

export interface MenuProps extends RCMenuProps {
  menuButton: React.ReactElement;
  menuItems: MenuItems;
}

const mapMenuItems = (menuItems: MenuItems) =>
  menuItems.map(({ name, ...menuItem }, i) => {
    if (name === 'sub-menu') {
      const { menuItems: subMenuItems, ...menuItemProps } = menuItem as SubMenuProps;
      return (
        <SubMenu key={i} {...(menuItemProps as SubMenuProps)}>
          {mapMenuItems(subMenuItems)}
        </SubMenu>
      );
    }

    if (name === 'menu-item') {
      const { startIcon, endIcon, children, ...menuItemProps } = menuItem as MenuItemProps;
      return (
        <MenuItem key={i} {...menuItemProps}>
          {startIcon}
          <span className="rc-menu__item__children">{children}</span>
          {endIcon}
        </MenuItem>
      );
    }

    if (name === 'divider') {
      return <MenuDivider key={i} {...(menuItem as MenuDividerProps)} />;
    }

    return null;
  });

export const Menu: React.FC<MenuProps> = ({ menuButton, menuItems, ...menuProps }) => {
  return (
    <RCMenu className="lc-menu" menuButton={menuButton} {...menuProps}>
      {mapMenuItems(menuItems)}
    </RCMenu>
  );
};
