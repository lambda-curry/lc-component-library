import React, { FC } from 'react';
import classNames from 'classnames';
import { InputBase, InputProps } from '../InputBase';
import { MultilineInput } from '../..';

export interface InputTextareaProps extends InputProps {
  rows?: number;
  characterLimit?: number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputTextarea: FC<InputTextareaProps> = ({
  className,
  rows = 3,
  characterLimit = 0,
  onChange,
  ...props
}) => {
  const fieldProps = props.formikProps?.getFieldProps ? props.formikProps?.getFieldProps(props.name) : null;
  const fieldValue = fieldProps?.value || props.value;

  return (
    <MultilineInput value={fieldValue} characterLimit={characterLimit}>
      {({ previousValue, characterCount }) => {
        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          let newValue = event.target.value;
          const newValueLength = newValue?.length || 0;
          const previousValueLength = previousValue?.length || 0;

          // Enforce the character limit if it is set
          if (characterLimit && newValueLength > previousValueLength && characterCount >= characterLimit) {
            newValue = previousValue;
          }

          if (props.formikProps?.setFieldValue) props.formikProps.setFieldValue(props.name, newValue);

          if (onChange) onChange(event);
        };

        return (
          <InputBase
            {...props}
            rows={rows}
            className={classNames('lc-input-textarea', className)}
            multiline={true}
            onChange={handleChange}
          />
        );
      }}
    </MultilineInput>
  );
};
