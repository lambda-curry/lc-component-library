import React from 'react';
import { StripeCardInput, StripeFormWrapper, StripeCardBrand, InputText } from '../..';
import { ButtonOutline, ButtonPrimary } from '../../buttons';

export const StripeExample1 = () => (
  <StripeFormWrapper
    initialValues={{ email: '', 'stripe-input': undefined }}
    STRIPE_KEY={process.env.STORYBOOK_STRIPE_KEY}
    onSubmit={() => {}}
  >
    {formikProps => {
      return (
        <div className="stripe-story">
          <p className="lc-mb-16">Values: {JSON.stringify(formikProps.values)}</p>
          <StripeCardInput label="Stripe Input" name="stripe-input" />
          <InputText label="Email" name="email" formikProps={formikProps} />
          <ButtonOutline onClick={() => formikProps.setFieldError('email', 'Please enter your email.')}>
            Set Email Value
          </ButtonOutline>
          <ButtonPrimary type="submit">Submit</ButtonPrimary>
        </div>
      );
    }}
  </StripeFormWrapper>
);

export const StripeExampleRejectedBrands = () => {
  const rejectedBrands = ['discover', 'diners', 'jcb', 'unionpay'];

  return (
    <StripeFormWrapper
      initialValues={{ 'stripe-input': undefined }}
      STRIPE_KEY={process.env.STORYBOOK_STRIPE_KEY}
      onSubmit={() => {}}
    >
      {formikProps => {
        return (
          <div className="stripe-story">
            <p className="lc-mb-16">Rejected brands: {JSON.stringify(rejectedBrands)}</p>
            <StripeCardInput
              label="Stripe Input"
              name="stripe-input"
              rejectedBrands={rejectedBrands as StripeCardBrand[]}
            />
            <ButtonPrimary type="submit">Submit</ButtonPrimary>
          </div>
        );
      }}
    </StripeFormWrapper>
  );
};

export const StripeExampleAcceptedBrands = () => {
  const acceptedBrands = ['visa', 'mastercard', 'amex'];

  return (
    <StripeFormWrapper
      initialValues={{ 'stripe-input': undefined }}
      STRIPE_KEY={process.env.STORYBOOK_STRIPE_KEY}
      onSubmit={() => {}}
    >
      {formikProps => {
        return (
          <div className="stripe-story">
            <p className="lc-mb-16">Accepted brands: {JSON.stringify(acceptedBrands)}</p>
            <StripeCardInput
              label="Stripe Input"
              name="stripe-input"
              acceptedBrands={acceptedBrands as StripeCardBrand[]}
              acceptedBrandsErrorMessage={brand =>
                `Sorry, we do not accept ${brand}. Try one of these instead: ${acceptedBrands.join(', ')}.`
              }
            />
            <ButtonPrimary type="submit">Submit</ButtonPrimary>
          </div>
        );
      }}
    </StripeFormWrapper>
  );
};
