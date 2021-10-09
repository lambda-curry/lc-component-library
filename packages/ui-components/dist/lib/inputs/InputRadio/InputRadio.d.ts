import { FC } from 'react';
import { FormikProps } from 'formik';
import { FormControlLabelProps, RadioProps } from '@material-ui/core';
import './input-radio.css';
export interface InputRadioProps extends RadioProps {
    label?: string;
    labelPlacement?: FormControlLabelProps['labelPlacement'];
    formikProps?: FormikProps<any>;
}
export declare const InputRadio: FC<InputRadioProps>;
