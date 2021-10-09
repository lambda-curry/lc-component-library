import React, { FC } from 'react';
import classNames from 'classnames';
import { InputBase, InputProps } from '../InputBase';

export const InputText: FC<InputProps> = ({ className, ...props }) => (
  <InputBase type="text" className={classNames('lc-input-text', className)} {...props} />
);
