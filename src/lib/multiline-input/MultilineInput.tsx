import React, { FC } from 'react';
import { CharacterLimit, Icon, useCharacterLimit, CharacterLimitHelpers } from '..';

import './multiline-input.scss';

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

      {characterLimit && (
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
