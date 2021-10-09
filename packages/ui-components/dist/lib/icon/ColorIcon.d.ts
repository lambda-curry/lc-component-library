import React, { FC } from 'react';
import './icon.css';
export declare const defaultColorIcons: {
    googleCalendar: React.FunctionComponent<React.SVGProps<SVGSVGElement> & {
        title?: string | undefined;
    }>;
    outlook: React.FunctionComponent<React.SVGProps<SVGSVGElement> & {
        title?: string | undefined;
    }>;
    americanExpress: React.FunctionComponent<React.SVGProps<SVGSVGElement> & {
        title?: string | undefined;
    }>;
    dinersClub: React.FunctionComponent<React.SVGProps<SVGSVGElement> & {
        title?: string | undefined;
    }>;
    discover: React.FunctionComponent<React.SVGProps<SVGSVGElement> & {
        title?: string | undefined;
    }>;
    masterCard: React.FunctionComponent<React.SVGProps<SVGSVGElement> & {
        title?: string | undefined;
    }>;
    jcb: React.FunctionComponent<React.SVGProps<SVGSVGElement> & {
        title?: string | undefined;
    }>;
    visa: React.FunctionComponent<React.SVGProps<SVGSVGElement> & {
        title?: string | undefined;
    }>;
};
export declare type DefaultColorIconNames = keyof typeof defaultColorIcons;
export interface ColorIconProps {
    className?: string;
    name: DefaultColorIconNames | string;
    viewBox?: string;
}
export declare const ColorIcon: FC<ColorIconProps>;
