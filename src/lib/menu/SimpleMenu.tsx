import React from 'react';
import { Menu, MenuItem, MenuButton, SubMenu } from '@szhsin/react-menu';

export function SimpleMenu() {
  return (
    <Menu menuButton={<MenuButton>Open menu</MenuButton>}>
      <MenuItem>New File</MenuItem>
      <SubMenu label="Open">
        <MenuItem>index.html</MenuItem>
        <MenuItem>example.js</MenuItem>
        <MenuItem>about.css</MenuItem>
      </SubMenu>
      <MenuItem>Save</MenuItem>
    </Menu>
  );
}
