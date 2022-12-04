import React, { FC } from 'react';
import { Form, InputDate } from '../../..';

export const inputDateExample1: FC<any> = () => {
  return (
    <Form
      initialValues={{
        sampleDate: new Date(),
        formattedDate: '',
        onChangeDate: new Date()
      }}
    >
      {formikProps => (
        <>
          Value: {JSON.stringify(formikProps.values.sampleDate)}
          <InputDate name="sampleDate" />
          Value: {formikProps.values.formattedDate}
          <InputDate name="formattedDate" valueFormat={'LL/dd/yyyy'} />
          Value:{' '}
          {formikProps.values.onChangeDate instanceof Date ? formikProps.values.onChangeDate.toLocaleDateString() : ''}
          <InputDate name="onChangeDate" onChange={(date: string | Date | null) => console.log(date)} />
        </>
      )}
    </Form>
  );
};
