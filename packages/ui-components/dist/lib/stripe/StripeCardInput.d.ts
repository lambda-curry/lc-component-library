import { FC } from 'react';
import * as Stripe from '@stripe/stripe-js';
import './stripe-card-input.css';
export declare type StripeCardBrand = Exclude<Stripe.StripeCardElementChangeEvent['brand'], 'unknown'>;
export declare type StripeCardBrandErrorMessage = string | ((brand: StripeCardBrand) => string);
export interface StripeCardInputProps {
    name: string;
    label?: string;
    acceptedBrands?: StripeCardBrand[];
    rejectedBrands?: StripeCardBrand[];
    acceptedBrandsErrorMessage?: StripeCardBrandErrorMessage;
    rejectedBrandsErrorMessage?: StripeCardBrandErrorMessage;
}
export declare const StripeCardInput: FC<StripeCardInputProps>;
