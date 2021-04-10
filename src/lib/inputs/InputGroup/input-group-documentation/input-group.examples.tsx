import React, { FC } from 'react';
import { Button } from '../../../buttons/Button';
import { ButtonPrimary } from '../../../buttons/ButtonPrimary';
import { InputSelect } from '../../InputSelect/InputSelect';
import { InputText } from '../../InputText/InputText';
import { InputGroup } from '../InputGroup';

export const InputGroupExample: FC<any> = () => (
  <>
    <InputGroup>
      <InputText label="Sample Input" name="sampleInput" />
      <InputSelect
        label="Sample Select"
        name="sampleSelect"
        options={[
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
          { label: 'Option 3', value: '3' }
        ]}
      />
      <Button>Clear</Button>
      <ButtonPrimary>Save</ButtonPrimary>
    </InputGroup>
  </>
);
