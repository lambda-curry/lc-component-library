import React from 'react';

import '../src/styles/tailwind.scss';

export const StoryWrapper = ({ children }) => (
  <div className='storybook-wrapper'>{children}</div>
);

export default StoryWrapper;
