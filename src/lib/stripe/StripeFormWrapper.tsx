import React, { ReactElement } from 'react';
import * as Stripe from '@stripe/stripe-js';
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { Form } from '..';
import { FormikConfig, FormikHelpers, FormikProps } from 'formik';

type StripeFormWrapperProps = FormikConfig<any> & {
  className?: string;
  onError?: (reason: string) => void;
  children: (formikProps: FormikProps<any>) => ReactElement;
};

const StripeFormWrapperContent: React.FC<StripeFormWrapperProps> = props => {
  const elements = useElements();
  const stripe = useStripe();
  const { onSubmit, onError, ...formikConfig } = props;

  const handleSubmit = async (values: any, formikHelpers: FormikHelpers<any>) => {
    const { setSubmitting, setStatus } = formikHelpers;
    const handleError = (reason: string) => {
      setSubmitting(false);
      return onError && onError(reason);
    };

    setSubmitting(true);

    if (!elements) return handleError('no stripe elements');

    const card = elements.getElement(CardElement);
    if (!card) return handleError('no stripe card');

    const result = await stripe?.createToken(card);
    if (result?.error) return setStatus({ serverErrors: [result.error.message] });

    if (!result?.token) return handleError('no stripe token');

    setStatus({ serverErrors: [] });
    onSubmit({ values, token: result.token }, formikHelpers);
  };

  return <Form {...formikConfig} {...props} onSubmit={handleSubmit} />;
};

// Setup Stripe.js and the Elements provider
export const StripeFormWrapper: React.FC<{ STRIPE_KEY?: string } & StripeFormWrapperProps> = ({
  STRIPE_KEY,
  ...props
}) => {
  if (!STRIPE_KEY) throw new Error('STRIPE_KEY is required for StripeFormWrapper');

  const stripePromise = Stripe.loadStripe(STRIPE_KEY);

  return (
    <Elements stripe={stripePromise}>
      <StripeFormWrapperContent {...props} />
    </Elements>
  );
};
