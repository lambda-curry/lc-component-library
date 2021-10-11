import { FC, ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes, ForwardedRef } from 'react';
export declare type ButtonRef = HTMLButtonElement & HTMLAnchorElement;
export declare type ButtonAs = keyof Pick<JSX.IntrinsicElements, 'a' | 'button'> | ((props: ButtonHTMLAttributes<any> & AnchorHTMLAttributes<any>) => JSX.Element);
export declare type ButtonProps = (ButtonHTMLAttributes<any> & AnchorHTMLAttributes<any>) & {
    as?: ButtonAs;
    ref?: ForwardedRef<HTMLButtonElement & HTMLAnchorElement>;
    type?: 'button' | 'submit' | 'reset';
    icon?: ReactNode;
    iconPlacement?: 'end' | 'start';
    children?: ReactNode;
};
export declare const ButtonBase: FC<ButtonProps>;
