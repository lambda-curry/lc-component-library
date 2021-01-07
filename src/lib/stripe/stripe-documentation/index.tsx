import React from 'react';
import { StripeCardInput, StripeFormWrapper } from '../..';

export const StripeExample1 = () => (
  <StripeFormWrapper
    validationSchema={{}}
    initialValues={{ 'stripe-input': undefined }}
    STRIPE_KEY={process.env.STORYBOOK_STRIPE_KEY}
    onSubmit={() => {}}
  >
    {formikProps => (
      <div className="stripe-story">
        <p>Values: {JSON.stringify(formikProps.values)}</p>
        <StripeCardInput label="Stripe Input" name="stripe-input" />
      </div>
    )}
  </StripeFormWrapper>
);
