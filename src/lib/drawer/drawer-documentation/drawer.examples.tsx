import React, { useState } from 'react';
import { ButtonPrimary } from '../..';
import { Drawer } from '../Drawer';

export const DrawerExample1: React.FC<never> = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open}
      <ButtonPrimary onClick={() => setOpen(true)}>Open Drawer</ButtonPrimary>
      <Drawer open={open} setOpen={setOpen}>
        Hello World
      </Drawer>
    </>
  );
};
