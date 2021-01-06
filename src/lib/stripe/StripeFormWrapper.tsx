import React from 'react';
import * as Stripe from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// Setup Stripe.js and the Elements provider
export const StripeFormWrapper: React.FC<{ STRIPE_KEY?: string }> = ({ STRIPE_KEY, ...props }) => {
  if (!STRIPE_KEY) throw new Error('STRIPE_KEY is required for StripeFormWrapper');
  const stripePromise = Stripe.loadStripe(STRIPE_KEY);
  return <Elements stripe={stripePromise} {...props} />;
};
