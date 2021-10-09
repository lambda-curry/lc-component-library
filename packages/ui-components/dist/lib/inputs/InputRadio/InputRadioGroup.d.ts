import { FC } from 'react';
import { FormikProps } from 'formik';
import { RadioGroupProps } from '@material-ui/core';
import './input-radio.css';
export interface InputRadioGroupProps extends RadioGroupProps {
    className?: string;
    formikProps?: FormikProps<any>;
    label?: string;
}
export declare const InputRadioGroup: FC<InputRadioGroupProps>;
