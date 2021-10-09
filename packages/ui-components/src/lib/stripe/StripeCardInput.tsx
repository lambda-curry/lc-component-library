import React, { FC, useState } from 'react';
import * as Stripe from '@stripe/stripe-js';
import { CardElement } from '@stripe/react-stripe-js';
import { useField, useFormikContext } from 'formik';
import './stripe-card-input.css';
import { arrayToListString } from '../util/formatters';
import classNames from 'classnames';
import { get as _get, set as _set } from 'lodash';

export type StripeCardBrand = Exclude<Stripe.StripeCardElementChangeEvent['brand'], 'unknown'>;

export type StripeCardBrandErrorMessage = string | ((brand: StripeCardBrand) => string);

export interface StripeCardInputProps {
  name: string;
  label?: string;
  acceptedBrands?: StripeCardBrand[];
  rejectedBrands?: StripeCardBrand[];
  acceptedBrandsErrorMessage?: StripeCardBrandErrorMessage;
  rejectedBrandsErrorMessage?: StripeCardBrandErrorMessage;
}

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

const cardBrandNamesMap = {
  visa: 'Visa',
  mastercard: 'Mastercard',
  amex: 'American Express',
  discover: 'Discover',
  diners: 'Diners Club',
  jcb: 'JCB',
  unionpay: 'UnionPay'
};

export const StripeCardInput: FC<StripeCardInputProps> = ({
  name,
  label,
  acceptedBrands,
  acceptedBrandsErrorMessage,
  rejectedBrands,
  rejectedBrandsErrorMessage
}) => {
  const [cardDetails, setCardDetails] = useState<Stripe.StripeCardElementChangeEvent>();

  const getAcceptedBrandsErrorMessage = (brand: StripeCardBrand) => {
    const propsMessage = acceptedBrandsErrorMessage;

    if (propsMessage) return typeof propsMessage === 'function' ? propsMessage(brand) : propsMessage;

    return `We do not accept ${cardBrandNamesMap[brand]}. Please try ${arrayToListString(
      acceptedBrands?.map(brand => cardBrandNamesMap[brand]) || [],
      ' or '
    )}.`;
  };

  const getRejectedBrandsErrorMessage = (brand: StripeCardBrand) => {
    const propsMessage = rejectedBrandsErrorMessage;

    if (propsMessage) return typeof propsMessage === 'function' ? propsMessage(brand) : propsMessage;

    return `We do not accept ${arrayToListString(
      rejectedBrands?.map(brand => cardBrandNamesMap[brand]) || [],
      ' or '
    )}. Please try a different card.`;
  };

  const validate = (value: any) => {
    if (!cardDetails || cardDetails.empty) return `Please enter your credit card information.`;

    const { error, brand } = cardDetails;

    // Stripe errors take priority.
    if (error) return error.message;

    // Don't check rejected or accepted brands if the brand is "unknown".
    if (brand === 'unknown') return;

    // Display rejected brands error.
    if (rejectedBrands && rejectedBrands.includes(brand)) return getRejectedBrandsErrorMessage(brand);

    // Display accepted brands error.
    if (acceptedBrands && !acceptedBrands.includes(brand)) return getAcceptedBrandsErrorMessage(brand);

    return;
  };

  // Use the Formik Context.
  const { status, setStatus } = useFormikContext();
  const serverError =
    status?.serverErrors && name && _get(status.serverErrors, name) ? _get(status.serverErrors, name) : '';

  // Use the Formik Field.
  const [, meta, helpers] = useField({ name, validate });
  const { error } = meta;
  const { setValue, setTouched } = helpers;

  // Set errors.
  const hasError = !!error || !!serverError;
  const errorText = error || serverError;

  const handleChange = (event: Stripe.StripeCardElementChangeEvent) => {
    // Remove server errors.
    if (status?.serverErrors) setStatus({ ...status, serverErrors: { ..._set(status.serverErrors, name, '') } });

    setCardDetails(event);
    setValue(event.complete, true);
    setTouched(true);
  };

  const handleBlur = () => setTouched(true);

  return (
    <div
      className={classNames('lc-stripe-card-input', {
        'lc-stripe-card-input-invalid': hasError
      })}
    >
      {label && (
        <label className="lc-stripe-card-input-label" htmlFor={label}>
          {label}
        </label>
      )}
      <CardElement id={label} options={CARD_ELEMENT_OPTIONS} onChange={handleChange} onBlur={handleBlur} />
      {hasError && <div className="lc-stripe-card-input-error">{errorText}</div>}
    </div>
  );
};
