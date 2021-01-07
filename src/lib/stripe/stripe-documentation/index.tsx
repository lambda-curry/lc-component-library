import React from 'react';
import { Form, StripeCardInput, StripeFormWrapper } from '../..';

export const StripeExample1 = () => (
  <StripeFormWrapper STRIPE_KEY={process.env.STORYBOOK_STRIPE_KEY}>
    <Form initialValues={{ 'stripe-input': undefined }} onSubmit={() => {}}>
      {formikProps => (
        <div className="stripe-story">
          <p>Values: {JSON.stringify(formikProps.values)}</p>
          <StripeCardInput label="Stripe Input" name="stripe-input" />
        </div>
      )}
    </Form>
  </StripeFormWrapper>
);
