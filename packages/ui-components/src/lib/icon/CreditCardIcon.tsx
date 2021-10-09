import classNames from 'classnames';
import React, { FC } from 'react';
import { Icon } from './Icon';
import { ColorIcon } from './ColorIcon';

export enum CreditCardBrands {
  AmericanExpress = 'americanExpress',
  DinersClub = 'dinersClub',
  Discover = 'discover',
  JCB = 'jcb',
  MasterCard = 'masterCard',
  Visa = 'visa'
}

export interface CreditCardIconProps {
  brand: string;
  className?: string;
}

export const CreditCardIcon: FC<CreditCardIconProps> = ({ brand, className }) => {
  const creditCardBrand = Object.values(CreditCardBrands).find(
    creditCardBrand => creditCardBrand.toLowerCase() === brand?.toLowerCase()
  );

  const iconName = creditCardBrand ? creditCardBrand : 'creditCard';
  const T = creditCardBrand ? ColorIcon : Icon;

  return <T name={iconName} className={classNames('credit-card-icon', className)} />;
};
