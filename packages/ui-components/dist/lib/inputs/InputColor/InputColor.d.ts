import { FC, ChangeEvent } from 'react';
import { InputProps } from '../InputBase';
import './input-color.css';
export interface InputColorProps extends InputProps {
    onPickerChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}
export declare const InputColor: FC<InputColorProps>;
