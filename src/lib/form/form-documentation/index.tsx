import React, { useState } from 'react';
import * as Yup from 'yup';
import { ButtonOutlinePrimary, ButtonPrimary, Form, InputText } from '../..';

export const FormExample1 = () => {
  const [values, setValues] = useState({ input: '' });
  return (
    <div className="input-form-story">
      <ButtonOutlinePrimary className="lc-mb-16" onClick={() => window.alert('form was left unsaved and reset')}>
        Try clicking me when the input has an unsaved value
      </ButtonOutlinePrimary>
      <Form
        enableReinitialize
        initialValues={values}
        onSubmit={setValues}
        unsavedChanges
        unsavedChangesConfig={{ modalProps: { ariaHideApp: false } }}
        validationSchema={Yup.object().shape({
          input: Yup.string().required(`Please enter an input value.`)
        })}
      >
        {formikProps => (
          <>
            <InputText autoComplete="off" label="Text Input" name="input" formikProps={formikProps} />
            {formikProps.dirty ? (
              <ButtonPrimary type="submit">Save</ButtonPrimary>
            ) : (
              <ButtonPrimary>Saved</ButtonPrimary>
            )}
          </>
        )}
      </Form>
    </div>
  );
};

export const FormExample2 = () => {
  const [values, setValues] = useState({ input: '' });
  return (
    <div className="input-form-story lc-mt-32">
      <p className="lc-mb-16">
        Apply global input settings using <code>{`formConfig={labelPlacement: 'above'}`}</code>
      </p>
      <Form
        enableReinitialize
        initialValues={values}
        onSubmit={setValues}
        validationSchema={Yup.object().shape({
          input1: Yup.string().required(`Please enter an input value.`),
          input2: Yup.string().required(`Please enter an input value.`)
        })}
        formConfig={{ labelPlacement: 'above' }}
      >
        {formikProps => (
          <>
            <InputText autoComplete="off" label="Text Input 1" name="input1" formikProps={formikProps} />
            <InputText autoComplete="off" label="Text Input 2" name="input2" formikProps={formikProps} />
          </>
        )}
      </Form>
    </div>
  );
};
