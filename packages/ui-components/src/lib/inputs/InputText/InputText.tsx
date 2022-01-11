import React, { FC, forwardRef } from 'react';
import classNames from 'classnames';
import { InputBase, InputProps } from '../InputBase';

export interface InputTextProps extends InputProps {}

export const InputText: FC<InputTextProps> = forwardRef(({ className, ...props }, ref) => (
  <InputBase ref={ref} type="text" className={classNames('lc-input-text', className)} {...props} />
));
