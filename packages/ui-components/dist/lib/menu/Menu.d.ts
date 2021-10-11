import { FC, ReactElement } from 'react';
import { MenuItemProps as RCMenuItemProps, MenuProps as RCMenuProps, SubMenuProps as RCSubMenuProps, ControlledMenuProps } from '@szhsin/react-menu';
import './menu.css';
export declare type MenuItems = (MenuItemProps | MenuDividerProps | SubMenuProps)[];
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
export declare const Menu: FC<MenuProps | HoverMenuProps>;
export {};
