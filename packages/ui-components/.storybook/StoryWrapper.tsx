import React from 'react';
import { IconRegistry, ThemeBase } from '../src/lib';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ReactComponent as peaceSymbol } from './assets/hand-peace-light.svg';

export const StoryWrapper = ({ children }) => (
  <ThemeBase>
    <IconRegistry icons={{ peaceSymbol }}>
      <div className="storybook-wrapper">{children}</div>
    </IconRegistry>
  </ThemeBase>
);

export default StoryWrapper;
