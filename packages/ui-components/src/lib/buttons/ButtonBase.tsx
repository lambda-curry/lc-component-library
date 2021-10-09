import React, { FC, ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes, forwardRef, ForwardedRef } from 'react';
import classNames from 'classnames';

export type ButtonRef = HTMLButtonElement & HTMLAnchorElement;

export type ButtonAs =
  | keyof Pick<JSX.IntrinsicElements, 'a' | 'button'>
  | ((props: ButtonHTMLAttributes<any> & AnchorHTMLAttributes<any>) => JSX.Element);

export type ButtonProps = (ButtonHTMLAttributes<any> & AnchorHTMLAttributes<any>) & {
  as?: ButtonAs;
  ref?: ForwardedRef<HTMLButtonElement & HTMLAnchorElement>;
  type?: 'button' | 'submit' | 'reset';
  icon?: ReactNode;
  iconPlacement?: 'end' | 'start';
  children?: ReactNode;
};

export const ButtonBase: FC<ButtonProps> = forwardRef(
  ({ className, as: T = 'button', type = 'button', icon, iconPlacement, children, ...props }, ref) => (
    <T
      {...props}
      ref={ref}
      type={T === 'button' ? type : undefined}
      className={classNames(
        [
          `lc-button`,
          `lc-inline-flex`,
          `lc-items-center`,
          `lc-justify-center`,
          `lc-text-center`,
          `lc-font-sans`,
          `lc-text-sm`,
          `lc-appearance-none`,
          `lc-no-underline`,
          `lc-transform`,
          `hover:lc-cursor-pointer`,
          `active:lc-scale-98`,
          `disabled:lc-scale-1`,
          `disabled:lc-opacity-50`,
          `disabled:lc-cursor-not-allowed`,
          `focus:lc-ring-transparent`,
          iconPlacement && iconPlacement === 'end' ? `lc-flex-row-reverse` : ''
        ],
        className
      )}
    >
      {icon && (
        <span
          className={classNames(`lc-button-icon`, iconPlacement === 'end' ? `lc-ml-8 lc--mr-8` : `lc--ml-8 lc-mr-8`)}
        >
          {icon}
        </span>
      )}
      {children && <span className="lc-button-content">{children}</span>}
    </T>
  )
);
