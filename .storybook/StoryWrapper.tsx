import React from 'react';
import { IconRegistry } from '../src/lib';

// @ts-ignore
import { ReactComponent as peaceSymbol } from './assets/hand-peace-light.svg';

import './storybook-preview.scss';

export const StoryWrapper = ({ children }) => (
  <IconRegistry icons={{ peaceSymbol }}>
    <div className="storybook-wrapper">{children}</div>
  </IconRegistry>
);

export default StoryWrapper;
