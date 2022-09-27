import React, { FC } from 'react';
import { FormikProps, useFormik } from 'formik';
import { InputDate } from '../../..';

export const inputDateExample1: FC<any> = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const formikProps: FormikProps<any> = useFormik({
    initialValues: {
      sampleDate: new Date(),
      formattedDate: '',
      onChangeDate: new Date()
    },
    onSubmit: () => undefined
  });

  return (
    <>
      Value: {JSON.stringify(formikProps.values.sampleDate)}
      <InputDate name="sampleDate" formikProps={formikProps} />
      Value: {formikProps.values.formattedDate}
      <InputDate name="formattedDate" valueFormat={'LL/dd/yyyy'} formikProps={formikProps} />
      Value:{' '}
      {formikProps.values.onChangeDate instanceof Date ? formikProps.values.onChangeDate.toLocaleDateString() : ''}
      <InputDate
        name="onChangeDate"
        formikProps={formikProps}
        onChange={(date: string | Date | null) => console.log(date)}
      />
    </>
  );
};
