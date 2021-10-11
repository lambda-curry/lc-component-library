import { FC, ReactNode, ChangeEvent } from 'react';
import { TabsProps as MuiTabsProps } from '@material-ui/core';
export interface TabPanelProps {
    index: any;
    value: any;
}
export interface TabsProps extends Omit<MuiTabsProps, 'onChange'> {
    ariaLabel?: string;
    className?: string;
    onChange?: (event: ChangeEvent<any>, value: any) => void;
    tabs: {
        label: string | ReactNode;
        render: ReactNode;
    }[];
}
export declare const Tabs: FC<TabsProps>;
