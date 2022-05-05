import React, { FC, PropsWithChildren, ReactElement, useRef } from 'react';
import {
  Menu as RCMenu,
  MenuItem,
  MenuItemProps as RCMenuItemProps,
  MenuProps as RCMenuProps,
  MenuDivider,
  SubMenu,
  SubMenuProps as RCSubMenuProps,
  ControlledMenu,
  useMenuState,
  ControlledMenuProps
} from '@szhsin/react-menu';
import './menu.css';
import classNames from 'classnames';

export type MenuItems = (MenuItemProps | MenuDividerProps | SubMenuProps)[];

interface MenuItemProps extends RCMenuItemProps {
  name: 'menu-item';
  startIcon?: ReactElement;
  endIcon?: ReactElement;
}

interface MenuDividerProps {
  name: 'divider';
  className?: string;
  style?: any;
  children?: undefined;
}

interface SubMenuProps extends RCSubMenuProps {
  name: 'sub-menu';
  menuItems: MenuItems;
  children?: undefined;
}

export interface MenuProps extends RCMenuProps {
  hover?: boolean;
  menuButton: any;
  menuItems: MenuItems;
}
export interface HoverMenuProps extends ControlledMenuProps {
  hover?: boolean;
  menuButton: any;
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
          <span className="szh-menu__item__children">{children}</span>
          {endIcon}
        </MenuItem>
      );
    }

    if (name === 'divider') {
      return <MenuDivider key={i} {...(menuItem as MenuDividerProps)} />;
    }

    return null;
  });

export const Menu: FC<PropsWithChildren<MenuProps | HoverMenuProps>> = props => {
  const ref = useRef(null);
  const { toggleMenu, state, ...menuStateProps } = useMenuState();

  if ('hover' in props) {
    const { menuButton, menuItems, hover, ...hoverMenuProps } = props;

    return (
      <div className={classNames('lc-menu', { state })} onMouseLeave={() => toggleMenu(false)}>
        <div className="lc-menu-button-wrapper" ref={ref} onMouseEnter={() => toggleMenu(true)}>
          {menuButton}
        </div>
        <ControlledMenu
          state={state}
          {...menuStateProps}
          {...(hoverMenuProps as HoverMenuProps)}
          anchorRef={ref}
          onClose={() => toggleMenu(false)}
          onMouseLeave={() => toggleMenu(false)}
        >
          {mapMenuItems(menuItems)}
        </ControlledMenu>
      </div>
    );
  }

  const { menuItems, ...menuProps } = props;

  return (
    <RCMenu className="lc-menu" position="initial" {...(menuProps as MenuProps)}>
      {mapMenuItems(menuItems)}
    </RCMenu>
  );
};
