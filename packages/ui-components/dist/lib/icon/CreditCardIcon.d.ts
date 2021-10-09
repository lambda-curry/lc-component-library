import { FC } from 'react';
export declare enum CreditCardBrands {
    AmericanExpress = "americanExpress",
    DinersClub = "dinersClub",
    Discover = "discover",
    JCB = "jcb",
    MasterCard = "masterCard",
    Visa = "visa"
}
export interface CreditCardIconProps {
    brand: string;
    className?: string;
}
export declare const CreditCardIcon: FC<CreditCardIconProps>;
