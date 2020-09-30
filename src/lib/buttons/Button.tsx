import React, { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';
import './buttons.scss';

export type ButtonProps = ButtonHTMLAttributes<any> & {
  as?: (props: ButtonHTMLAttributes<{ children: React.ReactNode }>) => JSX.Element;
  type?: 'button' | 'submit' | 'reset' | undefined;
};

export const Button: React.FC<ButtonProps> = ({
  className,
  as = props => <button {...props} />,
  type = 'button',
  ...rest
}) => <>{as({ className: classNames('button', className), type, ...rest })}</>;

// Now we can simply pass in any element to use as a button
export const AnchorButton = (props: ButtonProps) => <Button as={renderProps => <a {...renderProps} {...props} />} />;
