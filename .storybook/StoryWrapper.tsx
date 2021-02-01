import React from 'react';
import { IconRegistry, ThemeBase } from '../src/lib';

// @ts-ignore
import { ReactComponent as peaceSymbol } from './assets/hand-peace-light.svg';

import './storybook-preview.scss';

export const StoryWrapper = ({ children }) => (
  <ThemeBase>
    <IconRegistry icons={{ peaceSymbol }}>
      <div className="storybook-wrapper">{children}</div>
    </IconRegistry>
  </ThemeBase>
);

export default StoryWrapper;
