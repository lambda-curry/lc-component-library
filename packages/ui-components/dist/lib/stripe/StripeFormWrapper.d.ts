import { FC, ReactElement } from 'react';
import { FormikConfig, FormikProps } from 'formik';
export interface StripeFormWrapperProps extends FormikConfig<any> {
    className?: string;
    onError?: (reason: string) => void;
    children: (formikProps: FormikProps<any>) => ReactElement;
}
export declare const StripeFormWrapper: FC<{
    STRIPE_KEY?: string;
} & StripeFormWrapperProps>;
