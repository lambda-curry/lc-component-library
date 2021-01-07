import React, { useState } from 'react';
import * as Stripe from '@stripe/stripe-js';
import { CardElement } from '@stripe/react-stripe-js';
import { ErrorMessage, useField } from 'formik';
import './stripe-card-input.scss';

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

export const StripeCardInput = ({ name, label }: { name: string; label?: string }) => {
  const [cardDetails, setCardDetails] = useState<Stripe.StripeCardElementChangeEvent>();
  const [field, , helpers] = useField({ name });
  const { onBlur, onChange, value } = field;
  const { setError, setValue, setTouched } = helpers;

  const handleChange = (event: Stripe.StripeCardElementChangeEvent) => {
    onChange(name);
    setValue(event.complete);
    setTouched(false);
    setCardDetails(event);

    if (event.error) setError(event.error.message);
  };

  const handleBlur = () => onBlur({ target: { name, value } });

  return (
    <div className="lc-stripe-card-input">
      {label && (
        <label className="lc-stripe-card-input-label" htmlFor={label}>
          {label}
        </label>
      )}
      <CardElement id={label} options={CARD_ELEMENT_OPTIONS} onBlur={handleBlur} onChange={handleChange} />
      {cardDetails?.error?.message ? (
        <div className="lc-stripe-card-input-error">{cardDetails.error.message}</div>
      ) : (
        <ErrorMessage className="lc-stripe-card-input-error" name={name} component="div" />
      )}
    </div>
  );
};
