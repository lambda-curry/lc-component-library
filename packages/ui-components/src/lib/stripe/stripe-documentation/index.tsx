import React, { FC } from 'react';
import { StripeCardInput, StripeFormWrapper, StripeCardBrand } from '../..';
import { ButtonPrimary } from '../../buttons';

export const StripeExample1: FC = () => (
  <StripeFormWrapper
    initialValues={{ 'stripe-input': undefined }}
    STRIPE_KEY={process.env.STORYBOOK_STRIPE_KEY}
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onSubmit={() => {}}
  >
    {formikProps => {
      return (
        <div className="stripe-story">
          <p className="lc-mb-16">Values: {JSON.stringify(formikProps.values)}</p>
          <StripeCardInput label="Stripe Input" name="stripe-input" />
          <ButtonPrimary type="submit">Submit</ButtonPrimary>
        </div>
      );
    }}
  </StripeFormWrapper>
);

export const StripeExampleRejectedBrands: FC = () => {
  const rejectedBrands = ['discover', 'diners', 'jcb', 'unionpay'];

  return (
    <StripeFormWrapper
      initialValues={{ 'stripe-input': undefined }}
      STRIPE_KEY={process.env.STORYBOOK_STRIPE_KEY}
      // eslint-disable-next-line @typescript-eslint/no-empty-function
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

export const StripeExampleAcceptedBrands: FC = () => {
  const acceptedBrands = ['visa', 'mastercard', 'amex'];

  return (
    <StripeFormWrapper
      initialValues={{ 'stripe-input': undefined }}
      STRIPE_KEY={process.env.STORYBOOK_STRIPE_KEY}
      // eslint-disable-next-line @typescript-eslint/no-empty-function
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
