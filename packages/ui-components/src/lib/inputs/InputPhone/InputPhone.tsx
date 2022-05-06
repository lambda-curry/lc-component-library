import React, { FC } from 'react';
import classNames from 'classnames';
import { IMaskInput } from 'react-imask';
import { useFormContext } from '../../hooks';
import { InputBase, InputProps } from '../InputBase';

// Resource: https://mui.com/components/text-fields/
// Issue with types: https://github.com/uNmAnNeR/imaskjs/issues/554
const PhoneMask = React.forwardRef<HTMLElement, any>((props, ref) => (
  // TODO: #106 Fix React 18 TypeScript errors @jaredhill4
  // @ts-ignore
  <IMaskInput {...props} mask="(000) 000-0000" inputRef={ref} />
));

export const InputPhone: FC<InputProps> = ({ className, ...props }) => {
  const formContext = useFormContext();
  if (!props.formikProps && formContext) props.formikProps = formContext;

  props.InputProps = { ...props.InputProps, inputComponent: PhoneMask as any };

  return (
    <InputBase
      placeholder="(   )    -    "
      type="text"
      className={classNames('lc-input-phone', className)}
      inputProps={{
        onAccept: (value: string, mask: any) => {
          // Note: this is a workaround for a browser autocomplete issue and assumes only 10 digits phone numbers
          if (mask._unmaskedValue.length === 10 && props.formikProps?.setFieldValue) {
            props.formikProps.setFieldValue(props.name, value);
          }
        }
      }}
      {...props}
    />
  );
};
