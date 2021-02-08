import React, { FC, ReactNode, ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';
import { ButtonIcon } from './ButtonIcon';

export type ButtonProps = ButtonHTMLAttributes<any> & {
  as?: keyof JSX.IntrinsicElements | ((props: ButtonHTMLAttributes<{ children: ReactNode }>) => JSX.Element);
  type?: 'button' | 'submit' | 'reset';
  icon?: ReactNode;
  iconPlacement?: 'end' | 'start';
  children: ReactNode;
};

export const ButtonBase: FC<ButtonProps> = React.forwardRef(
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
          `lc-font-sans`,
          `lc-appearance-none`,
          `lc-no-underline`,
          `lc-transform`,
          `hover:lc-cursor-pointer`,
          `active:lc-scale-98`,
          `disabled:lc-scale-1`,
          `disabled:lc-opacity-50`,
          `disabled:lc-cursor-not-allowed`,
          iconPlacement && iconPlacement === 'end' ? `lc-flex-row-reverse` : ''
        ],
        className
      )}
    >
      {icon && (
        <ButtonIcon
          className={classNames(`lc-button-icon`, iconPlacement === 'end' ? `lc-ml-8 lc--mr-8` : `lc--ml-8 lc-mr-8`)}
        >
          {icon}
        </ButtonIcon>
      )}
      <span className="lc-button-content">{children}</span>
    </T>
  )
);
