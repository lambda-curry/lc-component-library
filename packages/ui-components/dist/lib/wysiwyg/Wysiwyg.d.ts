import { FunctionComponent } from 'react';
import { ReactQuillProps } from 'react-quill';
import { FormikProps } from 'formik';
import './wysiwyg.css';
export interface WysiwygProps extends ReactQuillProps {
    name: string;
    formikProps: FormikProps<any>;
    templateVariables?: string[];
    characterLimit?: number;
}
export declare const Wysiwyg: FunctionComponent<WysiwygProps>;
