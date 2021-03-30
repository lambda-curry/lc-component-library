import React, { FC } from 'react';
import { ButtonPrimary } from '../../../buttons/ButtonPrimary';
import { InputText } from '../../InputText/InputText';
import { InputGroup } from '../InputGroup';

export const InputGroupExample: FC<any> = () => (
  <InputGroup>
    <InputText name="sampleInput" label="Sample Input" />
    <ButtonPrimary>Save</ButtonPrimary>
  </InputGroup>
);
