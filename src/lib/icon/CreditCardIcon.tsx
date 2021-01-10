import React from 'react';
import { Icon } from '.';
import { ColorIcon } from './ColorIcon';

export enum CreditCardBrands {
  AmericanExpress = 'americanExpress',
  DinersClub = 'dinersClub',
  Discover = 'discover',
  JCB = 'jcb',
  MasterCard = 'masterCard',
  Visa = 'visa'
}

export const CreditCardIcon: React.FC<{ brand?: string }> = ({ brand }) => {
  const creditCardBrand = Object.values(CreditCardBrands).find(
    creditCardBrand => creditCardBrand.toLowerCase() === brand?.toLowerCase()
  );
  return creditCardBrand ? <ColorIcon name={creditCardBrand} /> : <Icon name="creditCard" />;
};
