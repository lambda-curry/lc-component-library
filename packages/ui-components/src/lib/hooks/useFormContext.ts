import { useContext } from 'react';
import { FormikContext, FormikContextType } from 'formik';

// Note: Using context this way instead of useFormikContext suppresses the error if it is not within Formik
// TODO: Need to fix formik types at some point, but coercing `any` for now...
export const useFormContext = <T>() => useContext<FormikContextType<T>>(FormikContext as any); // Using context this way instead of useFormikContext suppresses the error if it is not within Formik
