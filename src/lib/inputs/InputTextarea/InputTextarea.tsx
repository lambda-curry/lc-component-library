import React from 'react';
import classNames from 'classnames';
import { InputBase, InputProps } from '../InputBase';
import { useCharacterLimit, CharacterLimit, Icon } from '../..';
import { MultilineInputWrapper } from './MultilineInputWrapper';

import './input-textarea.scss';

export interface InputTextareaProps extends InputProps {
  rows?: number;
  rowsMax?: number;
  characterLimit: number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputTextarea = ({ className, rows = 3, characterLimit = 0, onChange, ...props }: InputTextareaProps) => {
  const fieldProps = props.formikProps?.getFieldProps(props.name);
  const fieldValue = fieldProps?.value || props.value;

  return (
    <MultilineInputWrapper value={fieldValue} characterLimit={characterLimit}>
      {({ previousValue, characterCount }) => {
        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          let newValue = event.target.value;
          const newValueLength = newValue?.length || 0;
          const previousValueLength = previousValue?.length || 0;

          // Enforce the character limit if it is set
          if (characterLimit && newValueLength > previousValueLength && characterCount >= characterLimit) {
            newValue = previousValue;
          }

          if (props.formikProps) props.formikProps.setFieldValue(props.name, newValue);

          if (onChange) onChange(event);
        };

        return (
          <InputBase
            {...props}
            className={classNames('lc-input-textarea', className)}
            multiline={true}
            rows={rows}
            onChange={handleChange}
          />
        );
      }}
    </MultilineInputWrapper>
  );
};
