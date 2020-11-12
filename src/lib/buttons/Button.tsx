import React, { ButtonHTMLAttributes, Reducer, useEffect, useReducer, useRef } from 'react';
import classNames from 'classnames';
import './buttons.scss';
import { buttonReducer, ButtonReducerState, ButtonReducerAction } from './Button.helpers';

export type ButtonProps = ButtonHTMLAttributes<any> & {
  ref?: React.MutableRefObject<any>;
  as?: (props: ButtonHTMLAttributes<{ children: React.ReactNode }>) => JSX.Element;
  type?: 'button' | 'submit' | 'reset' | undefined;
};

export const Button: React.FC<ButtonProps> = ({ className, as, type = 'button', ...rest }) => {
  const ref = useRef<HTMLElement>(null);
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

  // Note: Only passing ref in for button components right now, because not all components passed in can use a ref.
  // Also, I tried to refactor this code (see the latest version at commit 045d2af9ad87304d737bf7f0bf64c516cab1417b)
  // but that version had a bug that required multiple clicks to focusout of inputs, no idea why. - Jake 11/07/2020
  const buttonProps = { className: classNames('lc-button', { leftIcon, rightIcon }, className), type, ref, ...rest };
  if (as) buttonProps.ref = ref;
  as = as ? as : props => <button {...props} />;
  return <>{as(buttonProps)}</>;
};

// Now we can simply pass in any element to use as a button
export const AnchorButton = (props: ButtonProps) => <Button as={renderProps => <a {...renderProps} {...props} />} />;

function containsSVG(el: Element | null) {
  return el?.querySelector && !!el?.querySelector('svg');
}
