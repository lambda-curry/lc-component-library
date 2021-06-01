import React from 'react';
import { InputRadio } from '../../..';
import { Form } from '../../../form';

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
        <InputRadio id="sampleRadio.yes" label="Yes" name="sampleRadio" value="Yes" formikProps={formikProps} />
        <InputRadio id="sampleRadio.no" label="No" name="sampleRadio" value="No" formikProps={formikProps} />
      </>
    )}
  </Form>
);
