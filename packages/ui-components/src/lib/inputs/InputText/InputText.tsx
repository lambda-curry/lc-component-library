import React, { FC } from 'react';
import classNames from 'classnames';
import { InputBase, InputProps } from '../InputBase';

export interface InputTextProps extends InputProps {}

export const InputText: FC<InputTextProps> = ({ className, ...props }) => (
  <InputBase type="text" className={classNames('lc-input-text', className)} {...props} />
);
