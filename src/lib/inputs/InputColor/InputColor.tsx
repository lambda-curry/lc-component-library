import React, { FC, useState } from 'react';
import classNames from 'classnames';
import { FormikProps } from 'formik';
import { InputAdornment } from '@material-ui/core';
import MaskedInput from 'react-text-mask';
import { InputText } from '..';
import { InputProps } from '../InputBase';
import { isHexColor, hexColorRegex } from '../../util/colors';

import './input-color.scss';

interface TextMaskCustomProps {
  mask?: (string | RegExp)[];
  inputRef: (ref: HTMLInputElement | null) => void;
}

export interface InputColorProps<T> extends InputProps {
  className?: string;
  formikProps?: FormikProps<T>;
}

const InputColorMask: React.FC<TextMaskCustomProps> = props => {
  const { inputRef, mask, ...rest } = props;

  return (
    <MaskedInput
      mask={['#', ...new Array(6).fill(hexColorRegex, 0)]}
      {...rest}
      ref={(ref: any) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      placeholderChar={'\u2000'}
    />
  );
};

export const InputColor: FC<InputColorProps<any>> = ({
  className,
  onChange,
  placeholder = 'Pick a color',
  formikProps,
  ...props
}) => {
  const fieldProps = formikProps?.getFieldProps(props.name);
  const [fieldValue, setFieldValue] = useState(fieldProps?.value || props.value);
  const [pickerValue, setPickerValue] = useState(fieldProps?.value || props.value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setFieldValue(newValue);
    setPickerValue(isHexColor(newValue) ? newValue : '');

    if (formikProps) {
      formikProps.setFieldValue(props.name, newValue);
    }

    if (onChange) {
      onChange(event);
    }

    if (fieldProps?.onChange) {
      fieldProps.onChange(event);
    }
  };

  return (
    <InputText
      {...props}
      labelPlacement="above"
      placeholder={placeholder}
      value={fieldValue}
      onChange={handleChange}
      className={classNames('lc-input-color', { 'lc-input-color-invalid-hex': !!!pickerValue }, className)}
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
                onChange={handleChange}
                value={pickerValue}
              />
            </div>
          </InputAdornment>
        )
      }}
    />
  );
};
