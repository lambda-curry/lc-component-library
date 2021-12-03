import React, { FC } from 'react';
import classNames from 'classnames';
import MaskedInput, { MaskedInputProps } from 'react-text-mask';
import { InputBase, InputProps } from '../InputBase';

// Note: Example taken from documentation here which is why we use type 'any' so much: https://material-ui.com/components/text-fields/

const PhoneMask: FC<MaskedInputProps> = props => {
  const { onChange, ...rest } = props;

  return (
    <MaskedInput
      showMask
      guide={false}
      placeholderChar={'\u2000'}
      {...rest}
      onChange={event => {
        // Note: when the guide prop is enabled for some reason the mask value is still present when we clear the
        // input, so we need to manually reset the input value here
        if (event.target.value === '(   )    -    ') event.target.value = '';
        if (onChange) onChange(event);
      }}
    />
  );
};

export const InputPhone: FC<InputProps> = ({ className, ...props }) => {
  props.InputProps = { ...props.InputProps };
  return (
    <PhoneMask
      mask={['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      render={(ref, renderProps) => (
        <InputBase
          ref={ref as (inputElement: HTMLElement | null) => void}
          placeholder="(   )    -    "
          type="text"
          className={classNames('lc-input-phone', className)}
          {...props}
          {...renderProps}
        />
      )}
    />
  );
};
