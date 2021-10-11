import { FC } from 'react';
export interface CharacterLimitEffect {
    limit: number;
    value: string;
}
export interface CharacterLimitProps {
    limit: number;
    characterCount: number;
    className?: string;
}
export interface CharacterLimitHelpers {
    newValue: string;
    previousValue: string;
    characterCount: number;
    charactersRemaining: number;
}
export declare const useCharacterLimit: ({ value, limit }: CharacterLimitEffect) => CharacterLimitHelpers;
export declare const CharacterLimit: FC<CharacterLimitProps>;
