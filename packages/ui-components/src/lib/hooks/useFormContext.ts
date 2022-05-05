import { useContext } from 'react';
import { FormikContext, FormikContextType } from 'formik';

// Note: Using context this way instead of useFormikContext suppresses the error if it is not within Formik
// TODO: #106 Fix React 18 TypeScript errors
// @ts-ignore
export const useFormContext = <T>() => useContext<FormikContextType<T>>(FormikContext); // Using context this way instead of useFormikContext suppresses the error if it is not within Formik
