import React, { ButtonHTMLAttributes, Reducer, useEffect, useReducer, useRef } from 'react';
import classNames from 'classnames';
import './buttons.scss';
import { buttonReducer, ButtonReducerState, ButtonReducerAction } from './Button.helpers';

export type ButtonProps = ButtonHTMLAttributes<any> & {
  ref?: React.MutableRefObject<any>;
  as?: (props: ButtonHTMLAttributes<{ children: React.ReactNode }>) => JSX.Element;
  type?: 'button' | 'submit' | 'reset' | undefined;
};

export const Button: React.FC<ButtonProps> = ({
  className,
  as = props => <button {...props} />,
  type = 'button',
  ...rest
}) => {
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

  return <>{as({ className: classNames('lc-button', { leftIcon, rightIcon }, className), type, ref, ...rest })}</>;
};

// Now we can simply pass in any element to use as a button
export const AnchorButton = (props: ButtonProps) => <Button as={renderProps => <a {...renderProps} {...props} />} />;

function containsSVG(el: Element | null) {
  return el?.querySelector && !!el?.querySelector('svg');
}
