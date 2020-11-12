import React from 'react';
import classNames from 'classnames';
import MaskedInput from 'react-text-mask';
import { InputBase, InputProps } from '../InputBase';

// Note: Example taken from documentation here which is why we use type 'any' so much: https://material-ui.com/components/text-fields/

interface TextMaskCustomProps {
  mask?: (string | RegExp)[];
  inputRef: (ref: HTMLInputElement | null) => void;
}

const PhoneMask: React.FC<TextMaskCustomProps> = props => {
  const { inputRef, mask, ...rest } = props;

  return (
    <MaskedInput
      mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      {...rest}
      ref={(ref: any) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      placeholderChar={'\u2000'}
      showMask
    />
  );
};

export const InputPhone = ({ className, ...props }: InputProps) => {
  props.InputProps = { ...props.InputProps, inputComponent: PhoneMask as any };
  return <InputBase type="text" className={classNames('input-text', className)} {...props} />;
};
