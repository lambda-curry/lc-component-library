import React, { FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import { stripTags } from '../util/formatters';

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

export const useCharacterLimit = ({ value, limit }: CharacterLimitEffect) => {
  const [characterCount, setCharacterCount] = useState(0);
  const [previousValue, setPreviousValue] = useState(value);

  const handleValueChanged = (value: string) => {
    let newValue = value;
    const strippedNewValue = stripTags(newValue || '');

    setCharacterCount(strippedNewValue.length);
    setPreviousValue(newValue);
  };

  useEffect(() => {
    handleValueChanged(value);
  }, [value]);

  return { newValue: value, previousValue, characterCount, charactersRemaining: limit - characterCount };
};

export const CharacterLimit: FC<CharacterLimitProps> = ({ limit, characterCount, className }) => (
  <div className={classNames('character-limit', className)}>{limit - characterCount} characters remaining</div>
);
