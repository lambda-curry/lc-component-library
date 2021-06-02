import React from 'react';
import { InputRadio } from '../../..';
import { Form } from '../../../form';
import { InputRadioGroup } from '../InputRadioGroup';

export const inputRadioExample1: React.FC<any> = () => (
  <Form
    initialValues={{
      sampleRadio: 'Yes'
    }}
    onSubmit={() => undefined}
  >
    {formikProps => (
      <>
        Value: {formikProps.values.sampleRadio}
        <InputRadioGroup formikProps={formikProps} name="sampleRadio">
          <InputRadio id="sampleRadio.yes" label="Yes" value="Yes" />
          <InputRadio id="sampleRadio.no" label="No" value="No" />
        </InputRadioGroup>
      </>
    )}
  </Form>
);

export const inputRadioExample2: React.FC<any> = () => (
  <Form
    initialValues={{
      sampleRadio: 'Yes'
    }}
    onSubmit={() => undefined}
  >
    {formikProps => (
      <>
        Radio buttons aligned horizontally
        <br />
        Value: {formikProps.values.sampleRadio}
        <InputRadioGroup formikProps={formikProps} label="Sample Radio" name="sampleRadio" row>
          <InputRadio id="sampleRadio.yes" label="Yes" value="Yes" />
          <InputRadio id="sampleRadio.no" label="No" value="No" />
        </InputRadioGroup>
      </>
    )}
  </Form>
);
