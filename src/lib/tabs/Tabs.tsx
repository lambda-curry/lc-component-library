import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { Tabs as MuiTabs, Tab } from '@material-ui/core';

interface TabPanelProps {
  index: any;
  value: any;
}

const TabPanel: React.FC<TabPanelProps> = props => {
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

const useStyles = makeStyles((theme: Theme) => ({
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
    fontFamily: 'inherit',
    textTransform: 'none',
    borderBottom: '2px solid #e2e2e2',
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

export const Tabs: React.FC<{
  ariaLabel?: string;
  tabs: { label: string; render: React.ReactNode }[];
  variant?: 'scrollable' | 'standard' | 'fullWidth';
}> = ({ tabs, variant = 'fullWidth', ariaLabel }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
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
