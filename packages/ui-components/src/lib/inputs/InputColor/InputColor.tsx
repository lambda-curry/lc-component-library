import React, { FC, ChangeEvent } from 'react';
import classNames from 'classnames';
import InputAdornment from '@mui/material/InputAdornment';
import { IMaskInput } from 'react-imask';
import { InputText } from '../InputText/InputText';
import { InputProps } from '../InputBase';
import { isHexColor, hexColorRegex } from '../../util/colors';

import './input-color.css';
import { useFormContext } from '../../hooks';

export interface InputColorProps extends InputProps {
  onPickerChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

// Resource: https://mui.com/components/text-fields/
// Issue with types: https://github.com/uNmAnNeR/imaskjs/issues/554
const InputColorMask = React.forwardRef<HTMLElement, any>((props, ref) => (
  // TODO: #106 Fix React 18 TypeScript errors @jaredhill4
  // @ts-ignore
  <IMaskInput
    {...props}
    mask="#HHHHHH"
    definitions={{
      H: hexColorRegex
    }}
    inputRef={ref}
  />
));

export const InputColor: FC<InputColorProps> = ({
  className,
  placeholder = 'Pick a color',
  onPickerChange,
  ...props
}) => {
  const formContext = useFormContext();
  if (!props.formikProps && formContext) props.formikProps = formContext;

  const fieldProps = props.formikProps?.getFieldProps ? props.formikProps.getFieldProps(props.name) : null;
  const fieldHelpers = props.formikProps?.getFieldHelpers ? props.formikProps.getFieldHelpers(props.name) : null;
  const fieldValue = fieldProps?.value || props.value;
  const isValidColor = isHexColor(fieldValue);

  const handlePickerChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (fieldHelpers) fieldHelpers.setValue(event.target.value);
    if (onPickerChange) onPickerChange(event);
  };

  return (
    <InputText
      {...props}
      labelPlacement="above"
      placeholder={placeholder}
      className={classNames('lc-input-color', { 'lc-input-color-invalid-hex': !isValidColor }, className)}
      InputProps={{
        ...props.InputProps,
        inputComponent: InputColorMask as any,
        startAdornment: (
          <InputAdornment position="start">
            <div className="lc-input-color-picker">
              <input
                name={`_${props.name}_picker`}
                type="color"
                className="lc-input-color-picker-input"
                onChange={handlePickerChange}
                value={isValidColor ? fieldValue : '#000000'} // Set a valid hex value as the default to avoid console warnings.
              />
            </div>
          </InputAdornment>
        )
      }}
    />
  );
};
