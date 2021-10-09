import { FC, ReactNode, HTMLAttributes } from 'react';
export interface ModalHeaderProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
    title: ReactNode;
}
export declare const ModalHeader: FC<ModalHeaderProps>;
