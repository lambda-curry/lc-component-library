import React, { FC } from 'react';
import { ButtonPrimary } from '../..';
import { InputText } from '../../inputs';
import { Drawer } from '../Drawer';
import { DrawerProvider, useDrawer } from '../DrawerProvider';

export const DrawerExample1: FC<any> = () => (
  <DrawerProvider>
    <DrawerExample1Content />
  </DrawerProvider>
);

const DrawerExample1Content: FC<any> = () => {
  const {
    drawerActions: { toggleDrawer, getDrawerData, setDrawerData }
  } = useDrawer();

  const content = getDrawerData<{ content: string }>('ExampleDrawer').content;

  return (
    <>
      <ButtonPrimary onClick={() => toggleDrawer({ name: 'ExampleDrawer', data: { content: 'Hello World' } })}>
        Open Drawer
      </ButtonPrimary>
      <Drawer name="ExampleDrawer">
        <p>{content}</p>
        <br />
        <InputText
          name="content"
          label="Type to update the drawer content"
          value={content}
          onChange={event => setDrawerData({ name: 'ExampleDrawer', data: { content: event.target.value } })}
        />
      </Drawer>
    </>
  );
};
