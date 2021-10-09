import { FC } from 'react';
import ReactModal from 'react-modal';
import './modal.css';
export interface ModalProps extends ReactModal.Props {
    closeButton?: boolean;
}
export declare const Modal: FC<ModalProps>;
