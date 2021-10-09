import { FC, ChangeEvent } from 'react';
import { InputProps } from '../InputBase';
export interface InputTextareaProps extends InputProps {
    rows?: number;
    characterLimit?: number;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}
export declare const InputTextarea: FC<InputTextareaProps>;
