import React, { FC } from 'react';
import * as Stripe from '@stripe/stripe-js';
import { CardElement } from '@stripe/react-stripe-js';
import { ErrorMessage, useField } from 'formik';
import './stripe-card-input.scss';
import { arrayToList } from '../util/formatters';

// Custom styling can be passed to options when creating an Element.
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: 'black',
      fontFamily: '"gilroy", sans-serif',
      fontSize: '18px',
      '::placeholder': {
        color: '#a0a5ba',
        fontSize: '16px'
      },
      iconColor: '#0068ff'
    },
    invalid: {
      color: '#ff4500',
      iconColor: 'darkred'
    }
  }
};

export type StripeCardBrand = Exclude<Stripe.StripeCardElementChangeEvent['brand'], 'unknown'>;

export interface StripeCardInput {
  name: string;
  label?: string;
  acceptedBrands?: StripeCardBrand[];
  rejectedBrands?: StripeCardBrand[];
  acceptedBrandsErrorMessage?: (brand: StripeCardBrand) => string;
  rejectedBrandsErrorMessage?: (brand: StripeCardBrand) => string;
}

const cardBrandNamesMap = {
  visa: 'Visa',
  mastercard: 'Mastercard',
  amex: 'American Express',
  discover: 'Discover',
  diners: 'Diners Club',
  jcb: 'JCB',
  unionpay: 'UnionPay'
};

export const StripeCardInput: FC<StripeCardInput> = ({
  name,
  acceptedBrands,
  acceptedBrandsErrorMessage,
  rejectedBrands,
  rejectedBrandsErrorMessage,
  label
}) => {
  const [field, , helpers] = useField({ name });
  const { onChange } = field;
  const { setError, setValue, setTouched } = helpers;

  const getAcceptedBrandsErrorMessage = (brand: StripeCardBrand) => {
    if (acceptedBrandsErrorMessage) return acceptedBrandsErrorMessage(brand);

    return `We do not accept ${cardBrandNamesMap[brand]}. Please try ${arrayToList(
      acceptedBrands?.map(brand => cardBrandNamesMap[brand]) || [],
      'or'
    )}.`;
  };

  const getRejectedBrandsErrorMessage = (brand: StripeCardBrand) => {
    if (rejectedBrandsErrorMessage) return rejectedBrandsErrorMessage(brand);

    return `We do not accept ${arrayToList(
      rejectedBrands?.map(brand => cardBrandNamesMap[brand]) || [],
      'or'
    )}. Please try a different card.`;
  };

  const handleChange = (event: Stripe.StripeCardElementChangeEvent) => {
    const { brand } = event;

    onChange(name);
    setValue(event.complete, false);
    setTouched(true, false);

    // Clear previous errors.
    setError(undefined);

    // Stripe errors take priority.
    if (event.error) return setError(event.error.message);

    // Don't check rejected or accepted brands if the brand is "unknown".
    if (brand === 'unknown') return;

    // Display rejected brands error.
    if (rejectedBrands && rejectedBrands.includes(brand)) return setError(getRejectedBrandsErrorMessage(brand));

    // Display accepted brands error.
    if (acceptedBrands && !acceptedBrands.includes(brand)) {
      return setError(getAcceptedBrandsErrorMessage(brand));
    }
  };

  return (
    <div className="lc-stripe-card-input">
      {label && (
        <label className="lc-stripe-card-input-label" htmlFor={label}>
          {label}
        </label>
      )}
      <CardElement id={label} options={CARD_ELEMENT_OPTIONS} onChange={handleChange} />
      <ErrorMessage className="lc-stripe-card-input-error" name={name} component="div" />
    </div>
  );
};
