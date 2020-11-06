import React, { ButtonHTMLAttributes, forwardRef, Reducer, useEffect, useReducer, useRef } from 'react';
import classNames from 'classnames';
import './buttons.scss';
import { buttonReducer, ButtonReducerState, ButtonReducerAction } from './Button.helpers';

export type ButtonProps = ButtonHTMLAttributes<any> & {
  as?: (props: ButtonHTMLAttributes<{ children: React.ReactNode }>) => JSX.Element;
  type?: 'button' | 'submit' | 'reset' | undefined;
};

export const Button: React.FC<ButtonProps> = ({ className, as, type = 'button', ...rest }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [{ leftIcon, rightIcon }, dispatch] = useReducer<Reducer<ButtonReducerState, ButtonReducerAction>>(
    buttonReducer,
    {
      leftIcon: false,
      rightIcon: false
    }
  );
  useEffect(() => {
    const childNodes = ref.current?.childNodes;
    if (!childNodes || childNodes?.length < 2) return;
    if (childNodes && containsSVG(childNodes[0] as Element)) dispatch({ name: 'setLeftIcon', payload: true });
    if (childNodes && containsSVG(childNodes[childNodes.length - 1] as Element))
      dispatch({ name: 'setRightIcon', payload: true });
  }, [ref]);

  const ButtonComponent = as ? as : (props: ButtonProps) => <button ref={ref} {...props} />;
  const buttonProps = { className: classNames('lc-button', { leftIcon, rightIcon }, className), type, ...rest };
  return <ButtonComponent {...buttonProps} />;
};

// Now we can simply pass in any element to use as a button
export const AnchorButton = (props: ButtonProps) => <Button {...props} as={renderProps => <a {...renderProps} />} />;

function containsSVG(el: Element | null) {
  return el?.querySelector && !!el?.querySelector('svg');
}
