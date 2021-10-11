import { ReactElement } from 'react';
import { FormikConfig, FormikProps } from 'formik';
import { InputConfig } from '../inputs/InputBase';
import './form.css';
import ReactModal from 'react-modal';
export interface FormConfig extends InputConfig {
}
export interface UnsavedChangesModalProps extends Partial<ReactModal.Props> {
    modalTitle?: string;
    modalContent?: string;
    modalPrimaryButtonText?: string;
    modalCloseButtonText?: string;
}
export interface UnsavedChangesConfig {
    containerQuerySelectorAll?: string;
    targetQuerySelector?: string;
    modalProps?: UnsavedChangesModalProps;
}
export interface FormProps<T> extends FormikConfig<T> {
    className?: string;
    confirmUnsavedChanges?: boolean;
    unsavedChangesConfig?: UnsavedChangesConfig;
    withoutFormElement?: boolean;
    formConfig?: FormConfig;
    children: (formikProps: FormikProps<T>) => ReactElement;
}
export declare function Form<T>({ className, children, withoutFormElement, confirmUnsavedChanges, unsavedChangesConfig, formConfig, ...props }: FormProps<T>): ReactElement;
