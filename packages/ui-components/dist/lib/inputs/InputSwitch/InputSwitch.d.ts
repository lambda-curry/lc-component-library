import React, { FC, ChangeEvent } from 'react';
import { FormikProps } from 'formik';
import './input-switch.css';
export interface InputSwitchProps {
    id?: string;
    name?: string;
    label?: string;
    checked?: boolean;
    disabled?: boolean;
    labelOn?: string;
    labelOff?: string;
    labelPlacement?: 'end' | 'start';
    formikProps?: FormikProps<any>;
    className?: string;
    onClick?: (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
    onChange?: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}
export declare const InputSwitch: FC<InputSwitchProps>;
