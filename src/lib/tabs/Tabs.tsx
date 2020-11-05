import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { Tabs as MuiTabs, Tab } from '@material-ui/core';

interface TabPanelProps {
  children?: React.ReactNode;
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
    flexGrow: 1
  },
  tab: {
    borderBottom: '2px solid #e2e2e2',
    flex: 1,
    maxWidth: 'none',
    '&:focus': {
      outline: 'none'
    },
    '&.Mui-selected': {
      fontWeight: '700'
    }
  }
}));

export const Tabs: React.FC<{ ariaLabel?: string; tabs: { label: string; render: React.ReactNode }[] }> = ({
  tabs,
  ariaLabel
}) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <MuiTabs
          classes={{ indicator: classes.indicator }}
          value={value}
          onChange={handleChange}
          aria-label={ariaLabel}
        >
          {tabs.map((tab, index) => (
            <Tab className={classes.tab} label={tab.label} {...a11yProps(index)} />
          ))}
        </MuiTabs>
      </AppBar>

      {tabs.map((tab, index) => (
        <TabPanel className={classes.tabPanel} value={value} index={index}>
          {tab.render}
        </TabPanel>
      ))}
    </div>
  );
};
