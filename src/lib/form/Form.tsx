import React, { useRef, useState } from 'react';
import { Formik, FormikConfig, FormikProps, Form as FormikForm } from 'formik';
import classNames from 'classnames';
import { useOnClickOutside } from '../hooks';
import { Modal, ModalHeader, ModalActions, Button, ButtonPrimary } from '..';

interface UnsavedChangesConfig {
  containerQuerySelectorAll?: string;
  targetQuerySelector?: string;
  modalProps?: ReactModal.Props;
}

type FormProps<T> = FormikConfig<T> & {
  className?: string;
  unsavedChangesConfig?: UnsavedChangesConfig;
  children: (formikProps: FormikProps<T>) => React.ReactNode;
};

export function Form<T extends Object>({ className, children, unsavedChangesConfig = {}, ...rest }: FormProps<T>) {
  const formRef = useRef<FormikProps<T>>(null);
  const [activeModal, setActiveModal] = useState<'none' | 'unsavedChangesModal'>('none');
  const [shouldCheckForUnsavedChanges, setShouldCheckForUnsavedChanges] = useState<boolean>(true);

  const handleClickOutside = (event: Event) => {
    if (!shouldCheckForUnsavedChanges || !formRef.current?.dirty) {
      return;
    }

    event.preventDefault();
    setActiveModal('unsavedChangesModal');
  };

  const handleUnsavedChangesModalClose = () => {
    setActiveModal('none');

    setShouldCheckForUnsavedChanges(false);

    // Note: Wait for the modal to close before checking for clicks again, this avoids the modal from reopening
    // if the user clicks as the modal is closing.
    setTimeout(() => {
      setShouldCheckForUnsavedChanges(true);
    }, 500);
  };

  // TODO: update .navbar-back to utilize a button, avoid actions on clicks for things that are not <a> or <button>
  unsavedChangesConfig = {
    targetQuerySelector: 'a, button, .navbar-back',
    ...unsavedChangesConfig
  };

  useOnClickOutside(
    handleClickOutside,
    unsavedChangesConfig.containerQuerySelectorAll,
    unsavedChangesConfig.targetQuerySelector
  );

  return (
    <>
      <Formik innerRef={formRef} {...rest}>
        {(formikProps: FormikProps<T>) => (
          <FormikForm className={classNames(className, 'form')}>{children(formikProps)}</FormikForm>
        )}
      </Formik>
      <Modal isOpen={activeModal === 'unsavedChangesModal'} closeButton={false} {...unsavedChangesConfig.modalProps}>
        <ModalHeader title="You have unsaved changes!" />
        <p className="text">Click continue to abandon your changes and continue on.</p>
        <ModalActions>
          <div className="lc-flex-1" />
          <Button onClick={handleUnsavedChangesModalClose}>Cancel</Button>
          <ButtonPrimary onClick={() => null}>Continue</ButtonPrimary>
        </ModalActions>
      </Modal>
    </>
  );
}
