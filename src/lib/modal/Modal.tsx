import React, { FunctionComponent, useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import classNames from 'classnames';
import { IconButton } from '..';
import { Card, CardContent } from '@material-ui/core';
import './modal.scss';
import { motion, AnimatePresence } from 'framer-motion';

export const Modal: FunctionComponent<ReactModal.Props & { closeButton?: boolean }> = ({
  isOpen = false,
  className,
  closeButton = true,
  children,
  ...rest
}) => {
  const [open, setOpen] = useState(isOpen);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  return (
    <ReactModal {...rest} isOpen={open} className={classNames('modal', className)} closeTimeoutMS={500}>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, scale: 1.25, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ ease: 'easeOut', duration: 0.5 }}
            exit={{ opacity: 0, scale: 0.8, y: 20, transition: { ease: 'easeOut' } }}
          >
            <Card>
              {closeButton ? <IconButton className="modal-close" icon="close" onClick={() => setOpen(false)} /> : null}
              <CardContent>{children}</CardContent>
            </Card>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </ReactModal>
  );
};
