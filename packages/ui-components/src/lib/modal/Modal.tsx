import React, { FC, useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import classNames from 'classnames';
import { IconButton } from '../icon-button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
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
    // @ts-ignore
    <ReactModal {...rest} isOpen={open} className={classNames('lc-modal', className)} closeTimeoutMS={500}>
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
              {/* @ts-ignore */}
              <CardContent>{children}</CardContent>
            </Card>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </ReactModal>
  );
};
