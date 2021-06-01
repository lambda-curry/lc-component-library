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
        <InputRadioGroup
          formikProps={formikProps}
          legend="Sample Radio"
          name="sampleRadio"
          value={formikProps.values.sampleRadio}
        >
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
        <InputRadioGroup
          formikProps={formikProps}
          legend="Sample Radio"
          name="sampleRadio"
          row
          value={formikProps.values.sampleRadio}
        >
          <InputRadio id="sampleRadio.yes" label="Yes" value="Yes" />
          <InputRadio id="sampleRadio.no" label="No" value="No" />
        </InputRadioGroup>
      </>
    )}
  </Form>
);
