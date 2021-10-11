import { FC, ChangeEvent } from 'react';
import { AutocompleteChangeDetails, AutocompleteChangeReason, AutocompleteProps } from '@material-ui/lab';
import { InputProps } from '../InputBase';
import './input-select.css';
export declare type AutoCompleteChange = (event: ChangeEvent<any>, value: any, reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails<any> | undefined) => void;
export declare type InputSelectProps = Omit<InputProps, 'onChange'> & {
    value?: any;
    options: any[];
    optionLabelKey?: string;
    optionValueKey?: string;
    autocompleteConfig?: Partial<AutocompleteProps<any, boolean, boolean, boolean>>;
    allowCreateOption?: boolean;
    disableFilterOptionsByValue?: boolean;
    onChange?: AutoCompleteChange;
};
export declare const InputSelect: FC<InputSelectProps>;
