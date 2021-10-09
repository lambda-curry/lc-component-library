import { FC } from 'react';
import { IconNames } from '../icon/Icon';
import { ButtonProps } from '../buttons/ButtonBase';
import './icon-button.css';
export interface IconButtonProps extends ButtonProps {
    icon: IconNames;
}
export declare const IconButton: FC<IconButtonProps>;
