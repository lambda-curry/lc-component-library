import { FC } from 'react';
import { CheckboxProps, FormControlLabelProps } from '@material-ui/core';
import { FormikProps } from 'formik';
import './input-checkbox.css';
export declare type InputCheckboxProps = {
    label: string;
    labelPlacement?: FormControlLabelProps['labelPlacement'];
    formikProps?: FormikProps<any>;
} & CheckboxProps;
export declare const InputCheckbox: FC<InputCheckboxProps>;
