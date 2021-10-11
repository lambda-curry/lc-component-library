import { FC } from 'react';
import { DatePickerProps } from '@material-ui/pickers';
import { InputProps } from '../InputBase';
export declare type InputDateProps = Omit<InputProps, 'onChange'> & {
    value?: Date | string;
    onChange?: (date: Date | string | null) => void;
    inputFormat?: string;
    valueFormat?: string;
    disablePast?: boolean;
    className?: string;
    datePickerProps?: Partial<DatePickerProps>;
};
export declare const InputDate: FC<InputDateProps>;
