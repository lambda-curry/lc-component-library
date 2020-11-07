import React, { Reducer, useReducer, useRef } from 'react';
import { Formik, FormikConfig, FormikProps, Form as FormikForm, FormikHelpers, useFormikContext } from 'formik';
import classNames from 'classnames';
import { useOnClickOutside } from '../hooks';
import { Modal, ModalHeader, ModalActions, Button, ButtonPrimary } from '..';
import { formReducer, FormReducerAction, FormReducerState } from './Form.helpers';
import './form.scss';

interface UnsavedChangesConfig {
  containerQuerySelectorAll?: string;
  targetQuerySelector?: string;
  modalProps?: ReactModal.Props;
}

type FormProps<T> = FormikConfig<T> & {
  className?: string;
  unsavedChangesConfig?: UnsavedChangesConfig;
  withoutFormElement?: boolean;
  children: (formikProps: FormikProps<T>) => React.ReactNode;
};

const FormContent: React.FC<{
  className?: string;
  state: FormReducerState;
  dispatch: React.Dispatch<FormReducerAction>;
  withoutFormElement?: boolean;
  unsavedChangesConfig: UnsavedChangesConfig;
}> = ({ className, state, dispatch, withoutFormElement, unsavedChangesConfig, ...rest }) => {
  const formContext = useFormikContext();

  const handleClickOutside = (event: Event) => {
    if (!unsavedChangesConfig.containerQuerySelectorAll || !state.shouldCheckForUnsavedChanges || !formContext.dirty)
      return;

    event.preventDefault();
    dispatch({ name: 'openModal', payload: 'unsavedChangesModal' });
    dispatch({ name: 'setCapturedUnsavedChangesEvent', payload: event });
  };

  useOnClickOutside(
    handleClickOutside,
    unsavedChangesConfig.containerQuerySelectorAll
      ? `${unsavedChangesConfig.containerQuerySelectorAll}, #lc-unsaved-changes-modal`
      : undefined,
    unsavedChangesConfig.targetQuerySelector
  );

  return withoutFormElement ? (
    <div className={classNames(className, 'lc-form')} {...rest} />
  ) : (
    <FormikForm className={classNames(className, 'lc-form')} {...rest} />
  );
};

export function Form<T>({ className, children, withoutFormElement, unsavedChangesConfig = {}, ...rest }: FormProps<T>) {
  // TODO: update .navbar-back to utilize a button, avoid actions on clicks for things that are not <a> or <button>
  unsavedChangesConfig = {
    targetQuerySelector: 'a, button, .navbar-back, .snackbar, [role="dialog"]',
    ...unsavedChangesConfig
  };

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

  const handleUnsavedChangesModalContinue = () => {
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

    // Note: Wait for the modal to close before checking for clicks again, this avoids the modal from reopening
    // if the user clicks as the modal is closing.
    setTimeout(() => {
      dispatch({ name: 'setShouldCheckForUnsavedChanges', payload: true });
    }, 500);
  };

  return (
    <>
      <Formik {...rest}>
        {(formikProps: FormikProps<T>) => (
          <FormContent
            className={className}
            state={state}
            dispatch={dispatch}
            withoutFormElement={withoutFormElement}
            unsavedChangesConfig={unsavedChangesConfig}
          >
            {children(formikProps)}
          </FormContent>
        )}
      </Formik>
      <Modal id="lc-unsaved-changes-modal" isOpen={state.activeModal === 'unsavedChangesModal'} closeButton={false}>
        <ModalHeader title="You have unsaved changes!" />
        <p className="text">Click continue to abandon your changes and continue on.</p>
        <ModalActions>
          <div className="flex-spacer" />
          <Button onClick={handleUnsavedChangesModalClose}>Cancel</Button>
          <ButtonPrimary onClick={handleUnsavedChangesModalContinue}>Continue</ButtonPrimary>
        </ModalActions>
      </Modal>
    </>
  );
}
