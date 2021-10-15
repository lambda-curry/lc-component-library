import React, { FC, Reducer, useReducer, ReactElement, Dispatch } from 'react';
import { Formik, FormikConfig, FormikProps, Form as FormikForm, useFormikContext } from 'formik';
import classNames from 'classnames';
import { useOnClickOutside } from '../hooks';
import { Modal, ModalHeader, ModalActions } from '../modal';
import { formReducer, FormReducerAction, FormReducerState } from './Form.helpers';
import { InputConfig } from '../inputs/InputBase';
import './form.css';
import { Button } from '../buttons/Button';
import { ButtonPrimary } from '../buttons/ButtonPrimary';
import ReactModal from 'react-modal';

export interface FormConfig extends InputConfig {}

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

const FormContent: FC<{
  className?: string;
  state: FormReducerState;
  dispatch: Dispatch<FormReducerAction>;
  withoutFormElement?: boolean;
  confirmUnsavedChanges?: boolean;
  unsavedChangesConfig: UnsavedChangesConfig;
}> = ({ className, state, dispatch, withoutFormElement, confirmUnsavedChanges, unsavedChangesConfig, ...rest }) => {
  const formContext = useFormikContext();

  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    if (!confirmUnsavedChanges || !event.target || !state.shouldCheckForUnsavedChanges || !formContext.dirty) return;

    event.preventDefault();
    dispatch({ name: 'openModal', payload: 'unsavedChangesModal' });
    dispatch({ name: 'setCapturedUnsavedChangesEvent', payload: event });
  };

  useOnClickOutside(
    handleClickOutside,
    unsavedChangesConfig.containerQuerySelectorAll
      ? `${unsavedChangesConfig.containerQuerySelectorAll}, #lc-unsaved-changes-modal`
      : undefined,
    unsavedChangesConfig.targetQuerySelector,
    '[data-lc-trigger-unsaved-changes]'
  );

  return withoutFormElement ? (
    <div className={classNames(className, 'lc-form')} {...rest} />
  ) : (
    <FormikForm className={classNames(className, 'lc-form')} {...rest} />
  );
};

export function Form<T>({
  className,
  children,
  withoutFormElement,
  confirmUnsavedChanges,
  unsavedChangesConfig = {},
  formConfig,
  ...props
}: FormProps<T>): ReactElement {
  unsavedChangesConfig = {
    targetQuerySelector: 'a:not([href="#"]), button, .navbar-back',
    ...unsavedChangesConfig
  };

  const containerQuerySelectorItems = ['form', '.snackbar', '[role=dialog]'];
  // Note: If containerQuerySelectorAll is passed in, it will replace the form as a selector so you can target
  // specific parts of the form if desired
  if (unsavedChangesConfig?.containerQuerySelectorAll)
    containerQuerySelectorItems[0] = unsavedChangesConfig.containerQuerySelectorAll;
  unsavedChangesConfig.containerQuerySelectorAll = containerQuerySelectorItems.join(', ');

  const [state, dispatch] = useReducer<Reducer<FormReducerState, FormReducerAction>>(formReducer, {
    activeModal: 'none',
    shouldCheckForUnsavedChanges: true
  });

  const handleUnsavedChangesModalClose = () => {
    dispatch({ name: 'closeModal' });
    dispatch({ name: 'setShouldCheckForUnsavedChanges', payload: false });

    // Note: Wait for the modal to close before checking for clicks again, this avoids the modal from reopening
    // if the user clicks as the modal is closing.
    setTimeout(() => {
      dispatch({ name: 'setShouldCheckForUnsavedChanges', payload: true });
    }, 500);
  };

  const handleUnsavedChangesModalContinue = (formikProps: FormikProps<T>) => {
    dispatch({ name: 'closeModal' });
    dispatch({ name: 'setShouldCheckForUnsavedChanges', payload: false });

    // Note: We want to allow the user to continue on with the action they were trying to do as they opened
    // currently I am thinking triggering a click on the target element is the best approach for this.
    if (state.capturedUnsavedChangesEvent && unsavedChangesConfig.targetQuerySelector) {
      const targetElement: HTMLElement | null = (state.capturedUnsavedChangesEvent.target as HTMLElement).closest(
        unsavedChangesConfig.targetQuerySelector
      );

      if (targetElement) targetElement.click();
    }

    // Note: Resetting the form here will prevent times where menu dropdowns might trigger an unsaved changes modal
    // multiple times
    formikProps.resetForm();

    // Note: Wait for the modal to close before checking for clicks again, this avoids the modal from reopening
    // if the user clicks as the modal is closing.
    setTimeout(() => {
      dispatch({ name: 'setShouldCheckForUnsavedChanges', payload: true });
    }, 500);
  };

  const {
    modalCloseButtonText = 'Cancel',
    modalContent = 'Click continue to abandon your changes and proceed.',
    modalPrimaryButtonText = 'Continue',
    modalTitle = 'You have unsaved changes!'
  } = unsavedChangesConfig.modalProps || {};

  return (
    <Formik {...props} initialStatus={{ ...props.initialStatus, formConfig }}>
      {(formikProps: FormikProps<T>) => (
        <FormContent
          className={className}
          state={state}
          dispatch={dispatch}
          withoutFormElement={withoutFormElement}
          confirmUnsavedChanges={confirmUnsavedChanges}
          unsavedChangesConfig={unsavedChangesConfig}
        >
          <>
            {children(formikProps)}
            <Modal
              id="lc-unsaved-changes-modal"
              isOpen={state.activeModal === 'unsavedChangesModal'}
              closeButton={false}
              {...unsavedChangesConfig?.modalProps}
            >
              <ModalHeader title={modalTitle} />
              <p className="text">{modalContent}</p>
              <ModalActions>
                <div className="flex-spacer" />
                <Button onClick={handleUnsavedChangesModalClose}>{modalCloseButtonText}</Button>
                <ButtonPrimary onClick={() => handleUnsavedChangesModalContinue(formikProps)}>
                  {modalPrimaryButtonText}
                </ButtonPrimary>
              </ModalActions>
            </Modal>
          </>
        </FormContent>
      )}
    </Formik>
  );
}
