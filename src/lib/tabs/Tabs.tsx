import React, { FC, ReactNode, useState, ChangeEvent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { Tabs as MuiTabs, Tab } from '@material-ui/core';

interface TabPanelProps {
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
    backgroundColor: 'var(--primary-default-color, #3182ce)'
  },
  root: {
    flexGrow: 1,
    fontFamily: 'inherit'
  },
  tab: {
    textTransform: 'none',
    borderBottom: '2px solid var(--primary-light-color, #5e9bd5)',
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

export const Tabs: FC<{
  ariaLabel?: string;
  tabs: { label: string | ReactNode; render: ReactNode }[];
  variant?: 'scrollable' | 'standard' | 'fullWidth';
}> = ({ tabs, variant = 'fullWidth', ariaLabel }) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event: ChangeEvent<any>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} color="default" position="static">
        <MuiTabs
          variant={variant}
          aria-label={ariaLabel}
          classes={{ indicator: classes.indicator }}
          onChange={handleChange}
          value={value}
        >
          {tabs.map((tab, index) => (
            <Tab className={classes.tab} label={tab.label} {...a11yProps(index)} />
          ))}
        </MuiTabs>
      </AppBar>

      {tabs.map((tab, index) => (
        <TabPanel value={value} index={index}>
          {tab.render}
        </TabPanel>
      ))}
    </div>
  );
};
