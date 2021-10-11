import React from 'react';
import { Tabs } from '..';
import { Icon } from '../..';

export const SimpleTabs = () => {
  return (
    <Tabs
      tabs={[
        { label: 'Test 1', render: '1' },
        { label: 'Test 2', render: '2' },
        { label: 'Test 3', render: '3' },
        { label: 'Test 4', render: '4' }
      ]}
    />
  );
};

export const ScrollableTabs = () => {
  return (
    <Tabs
      tabs={[
        { label: 'Test 1', render: '1' },
        { label: 'Test 2', render: '2' },
        { label: 'Test 3', render: '3' },
        { label: 'Test 4', render: '4' },
        { label: 'Test 5', render: '5' },
        { label: 'Test 6', render: '6' },
        { label: 'Test 7', render: '7' },
        { label: 'Test 8', render: '8' }
      ]}
      variant="scrollable"
    />
  );
};

export const TabsWithCustomLabel = () => {
  return (
    <Tabs
      tabs={[
        {
          label: (
            <div>
              <Icon name="chat" /> Test 1
            </div>
          ),
          render: '1'
        }
      ]}
    />
  );
};

export const TabsWithDefaultActive = () => {
  return (
    <Tabs
      value={3}
      tabs={[
        { label: <p>Test 1</p>, render: '1' },
        { label: <p>Test 2</p>, render: '2' },
        { label: <p>Test 3</p>, render: '3' },
        { label: <p>Test 4</p>, render: '4' }
      ]}
    />
  );
};
