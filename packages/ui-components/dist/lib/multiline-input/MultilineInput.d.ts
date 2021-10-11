import { FC } from 'react';
import { CharacterLimitHelpers } from '../character-limit';
import './multiline-input.css';
export interface MultilineInputProps {
    value: string;
    characterLimit?: number;
    resize?: boolean;
    children: (characterLimitHelpers: CharacterLimitHelpers) => void;
}
export declare const MultilineInput: FC<MultilineInputProps>;
