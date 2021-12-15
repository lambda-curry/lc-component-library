import React, { FC, useState } from 'react';
import * as Yup from 'yup';
import { ButtonOutlinePrimary, ButtonPrimary, Form, InputText } from '../..';

export const FormExample1: FC = () => {
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
        confirmUnsavedChanges
        unsavedChangesConfig={{ modalProps: { ariaHideApp: false } }}
        validationSchema={Yup.object().shape({
          input: Yup.string().required(`Please enter an input value.`)
        })}
      >
        {formikProps => (
          <>
            <InputText autoComplete="off" label="Text Input" name="input" />
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

export const FormExample2: FC = () => {
  const [values, setValues] = useState({ input1: '', input2: '' });
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
        <InputText autoComplete="off" label="Text Input 1" name="input1" />
        <InputText autoComplete="off" label="Text Input 2" name="input2" />
      </Form>
    </div>
  );
};

export const FormExample3: FC = () => {
  const initialValues = window.localStorage.getItem('example-form')
    ? JSON.parse(window.localStorage.getItem('example-form') || '')
    : false;

  const [values, setValues] = useState(initialValues || { input1: '', input2: '' });
  return (
    <div className="input-form-story lc-mt-32">
      <p className="lc-mb-16">
        Use persisted values with <code>{`persistValuesConfig={{ persistKey: 'example-form' }}`}</code> or with your own
        custom persistFunction
        <code>
          {`persistValuesConfig={{ persistFunction: (values) =>  localStorage.setItem('example-form', JSON.stringify(values)) }}`}
        </code>
      </p>
      <InputText label="Text Input 3" name="input3" />
      <Form
        enableReinitialize
        initialValues={values}
        onSubmit={setValues}
        persistValuesConfig={{ persistKey: 'example-form' }}
        validationSchema={Yup.object().shape({
          input1: Yup.string().required(`Please enter an input value.`),
          input2: Yup.string().required(`Please enter an input value.`)
        })}
      >
        <InputText autoComplete="off" label="Text Input 1" name="input1" />
        <InputText autoComplete="off" label="Text Input 2" name="input2" />
      </Form>
    </div>
  );
};
