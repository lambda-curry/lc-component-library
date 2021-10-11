import React, { FC, ReactNode, useEffect, useState, ChangeEvent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { Tabs as MuiTabs, Tab, TabsProps as MuiTabsProps } from '@material-ui/core';
import classNames from 'classnames';

export interface TabPanelProps {
  index: any;
  value: any;
}

const TabPanel: FC<TabPanelProps> = props => {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
      {value === index && <>{children}</>}
    </div>
  );
};

function a11yProps(index: any) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`
  };
}

const useStyles = makeStyles(() => ({
  appBar: {
    backgroundColor: 'rgba(0,0,0,0)',
    boxShadow: 'none',
    color: 'inherit'
  },
  indicator: {
    backgroundColor: 'rgba(var(--lc-color-primary))'
  },
  root: {
    flexGrow: 1,
    fontFamily: 'inherit'
  },
  tab: {
    textTransform: 'none',
    borderBottom: '2px solid rgba(var(--lc-color-primary-light))',
    color: 'black',
    fontFamily: 'inherit',
    maxWidth: 'none',
    '&:focus': {
      outline: 'none'
    },
    '&.Mui-selected': {
      fontWeight: '700'
    }
  }
}));

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
  const classes = useStyles();

  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <div className={classNames(classes.root, className)}>
      <AppBar className={classes.appBar} color="default" position="static">
        <MuiTabs
          variant={variant}
          aria-label={ariaLabel}
          classes={{ indicator: classes.indicator }}
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
              className={classes.tab}
              value={index}
              label={tab.label}
              {...a11yProps(index)}
            />
          ))}
        </MuiTabs>
      </AppBar>

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
