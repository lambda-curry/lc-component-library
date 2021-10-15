import React from 'react';
import StorybookWrapper from './StoryWrapper';

import './storybook-preview.css';

const withStorybookWrapper = (Story, context) => (
  <StorybookWrapper>
    <Story {...context} />
  </StorybookWrapper>
);

export const decorators = [withStorybookWrapper];

export const parameters = {
  viewMode: 'docs',
  options: {
    storySort: (a, b) => (a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }))
  }
};
