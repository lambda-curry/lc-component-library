import React, { FC, useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import classNames from 'classnames';
import { IconButton } from '../icon-button';
import { Card, CardContent } from '@material-ui/core';
import { motion, AnimatePresence } from 'framer-motion';

import './modal.css';

export interface ModalProps extends ReactModal.Props {
  closeButton?: boolean;
}

export const Modal: FC<ModalProps> = ({ isOpen = false, className, closeButton = true, children, ...rest }) => {
  const [open, setOpen] = useState(isOpen);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  return (
    <ReactModal {...rest} isOpen={open} className={classNames('lc-modal', className)} closeTimeoutMS={500}>
      <div className="modal-container">
        <AnimatePresence>
          {open ? (
            <motion.div
              initial={{ opacity: 0, scale: 1.25, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ ease: 'easeOut', duration: 0.5 }}
              exit={{ opacity: 0, scale: 0.8, y: 20, transition: { ease: 'easeOut' } }}
            >
              <Card>
                {closeButton ? (
                  <IconButton className="lc-modal-close" icon="close" onClick={() => setOpen(false)} />
                ) : null}
                <CardContent>{children}</CardContent>
              </Card>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </ReactModal>
  );
};
