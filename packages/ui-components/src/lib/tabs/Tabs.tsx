import React, { FC, ReactNode, useEffect, useState, ChangeEvent } from 'react';
import MuiTabs, { TabsProps as MuiTabsProps } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import classNames from 'classnames';
import './tabs.css';

export interface TabPanelProps {
  index: any;
  value: any;
}

const TabPanel: FC<TabPanelProps> = props => {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
      {value === index && children}
    </div>
  );
};

function a11yProps(index: any) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`
  };
}

export interface TabsProps extends Omit<MuiTabsProps, 'onChange'> {
  ariaLabel?: string;
  className?: string;
  onChange?: (event: ChangeEvent<any>, value: any) => void;
  tabs: { label: string | ReactNode; render: ReactNode }[];
}

export const Tabs: FC<TabsProps> = ({
  ariaLabel,
  className,
  tabs,
  variant = 'fullWidth',
  onChange,
  value: initialValue = 0,
  ...rest
}) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <div className={classNames(className, 'lc-tabs')}>
      <MuiTabs
        variant={variant}
        aria-label={ariaLabel}
        {...rest}
        onChange={(event, value) => {
          setValue(value);
          if (onChange) onChange(event, value);
        }}
        value={value}
      >
        {tabs.map((tab, index) => (
          <Tab
            key={`${typeof tab.label === 'string' ? tab.label.replace(' ', '') : ''}_tab_${index}`}
            value={index}
            // @ts-ignore
            label={tab.label}
            {...a11yProps(index)}
          />
        ))}
      </MuiTabs>

      {tabs.map((tab, index) => (
        <TabPanel
          key={`${typeof tab.label === 'string' ? tab.label.replace(' ', '') : ''}_panel_${index}`}
          value={value}
          index={index}
        >
          {tab.render}
        </TabPanel>
      ))}
    </div>
  );
};
