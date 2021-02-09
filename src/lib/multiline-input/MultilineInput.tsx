import React, { FC } from 'react';
import { CharacterLimit, useCharacterLimit, CharacterLimitHelpers } from '../character-limit';
import { Icon } from '../icon';

import './multiline-input.css';

export interface MultilineInputProps {
  value: string;
  characterLimit?: number;
  resize?: boolean;
  children: (characterLimitHelpers: CharacterLimitHelpers) => void;
}

export const MultilineInput: FC<MultilineInputProps> = ({ value, characterLimit = 0, resize = true, children }) => {
  const characterLimitHelpers = useCharacterLimit({
    value,
    limit: characterLimit
  });

  return (
    <div className="lc-multiline-input">
      {children(characterLimitHelpers)}

      {characterLimit > 0 && (
        <CharacterLimit
          className="lc-multiline-input-character-limit"
          limit={characterLimit}
          characterCount={characterLimitHelpers.characterCount || 0}
        />
      )}

      {resize && (
        <div className="lc-multiline-input-resize">
          <Icon name="resize" />
        </div>
      )}
    </div>
  );
};
