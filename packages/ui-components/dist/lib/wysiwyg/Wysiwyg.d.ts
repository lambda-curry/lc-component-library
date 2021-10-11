import React, { FunctionComponent } from 'react';
import { FormikProps } from 'formik';
import './wysiwyg.css';
export interface WysiwygProps {
    name: string;
    formikProps: FormikProps<any>;
    templateVariables?: string[];
    characterLimit?: number;
    children?: React.ReactElement<any>;
    placeholder: string;
}
export declare const Wysiwyg: FunctionComponent<WysiwygProps>;
