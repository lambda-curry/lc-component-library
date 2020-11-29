import React from 'react';
import classNames from 'classnames';
import { InputBase, InputProps } from '../InputBase';

export interface InputTextareaProps extends InputProps {
  rows?: number;
  rowsMax?: number;
}

export const InputTextarea = ({ className, rows = 3, rowsMax = 10, ...props }: InputTextareaProps) => (
  <InputBase
    {...props}
    className={classNames('input-textarea', className)}
    multiline={true}
    rows={rows}
    rowsMax={rowsMax}
  />
);
