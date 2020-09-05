import React from 'react';
import classNames from 'classnames';
import { InputBase, InputProps } from '../InputBase';

export const InputText = ({ className, ...props }: InputProps) => (
  <InputBase type="text" className={classNames('input-text', className)} {...props} />
);
