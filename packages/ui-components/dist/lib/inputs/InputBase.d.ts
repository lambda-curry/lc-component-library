import { ReactNode, FC } from 'react';
import { OutlinedTextFieldProps } from '@material-ui/core/TextField';
import { FormikProps } from 'formik';
import './input.css';
declare type LabelPlacements = 'inset' | 'above';
export interface InputConfig {
    labelPlacement?: 'inset' | 'above';
    safeName?: boolean;
    inputBorderWhite?: boolean;
    shrinkLabel?: boolean;
}
export declare type InputProps = Omit<OutlinedTextFieldProps, 'variant' | 'prefix'> & {
    name: string;
    prefix?: ReactNode;
    suffix?: ReactNode;
    formikProps?: Partial<FormikProps<any>>;
    labelPlacement?: LabelPlacements;
    variant?: 'outlined' | 'standard' | 'filled';
    inputConfig?: InputConfig;
};
export declare const InputBase: FC<InputProps>;
export {};
