import React from 'react';
import classNames from 'classnames';
import MaskedInput from 'react-text-mask';
import { InputBase, InputProps } from '../InputBase';

// Note: Example taken from documentation here which is why we use type 'any' so much: https://material-ui.com/components/text-fields/

interface TextMaskCustomProps {
  mask?: (string | RegExp)[];
  inputRef: (ref: HTMLInputElement | null) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PhoneMask: React.FC<TextMaskCustomProps> = props => {
  const { inputRef, mask, onChange, ...rest } = props;

  return (
    <MaskedInput
      showMask
      guide={false}
      placeholderChar={'\u2000'}
      mask={['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      {...rest}
      ref={(ref: any) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      onChange={event => {
        // Note: when the guide prop is enabled for some reason the mask value is still present when we clear the
        // input, so we need to manually reset the input value here
        if (event.target.value === '(   )    -    ') event.target.value = '';
        if (onChange) onChange(event);
      }}
    />
  );
};

export const InputPhone = ({ className, ...props }: InputProps) => {
  props.InputProps = { ...props.InputProps, inputComponent: PhoneMask as any };
  return (
    <InputBase
      placeholder="(   )    -    "
      type="text"
      className={classNames('lc-input-phone', className)}
      {...props}
    />
  );
};
