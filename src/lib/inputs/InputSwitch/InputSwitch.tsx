import React, { useState, useEffect } from 'react';
import { FormikProps } from 'formik';
import classNames from 'classnames';

import './input-switch.scss';

export interface InputSwitchProps<T> {
    id?: string;
    name?: string;
    label?: string;
    checked?: boolean;
    disabled?: boolean;
    labelOn?: string;
    labelOff?: string;
    labelPlacement?: 'end' | 'start';
    formikProps?: FormikProps<T>;
    className?: string;
    onClick?: (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
    onMouseUp?: (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
    onMouseDown?: (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
    disableOnChange?: boolean;
}

export const InputSwitch = ({
    id,
    name,
    disabled,
    labelOn,
    labelOff,
    labelPlacement = 'end',
    formikProps,
    className,
    onClick,
    onChange,
    onMouseUp,
    onMouseDown,
    disableOnChange,
    ...props
}: InputSwitchProps<any>) => {
    const fieldProps = formikProps?.getFieldProps(name);
    const [label, setLabel] = useState(props.label);
    const [checked, setChecked] = useState(!!fieldProps?.value || !!props.checked);

    useEffect(() => {
        if (checked && labelOn) {
            setLabel(labelOn);
        }

        if (!checked && labelOff) {
            setLabel(labelOff);
        }
    }, [checked, labelOn, labelOff]);

    useEffect(() => {
        if (disableOnChange) {
            setChecked(!!props.checked);
        }
    }, [props.checked]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (disableOnChange) {
            return;
        }

        setChecked(event.target.checked);

        if (onChange) {
            onChange(event, event.target.checked);
        }

        if (fieldProps?.onChange) {
            fieldProps.onChange(event);
        }
    };

    const inputSwitchClassName = classNames(
        'input input-switch',
        {
            [`input-switch--label-position-${labelPlacement}`]: label && labelPlacement,
            [`input-switch--disabled`]: disabled
        },
        className
    );

    return (
        <label htmlFor={id} className={inputSwitchClassName}>
            <input
                id={id}
                name={name}
                type="checkbox"
                className="input-switch__input"
                {...fieldProps}
                {...props}
                checked={checked}
                disabled={disabled}
                onChange={handleChange}
                onClick={onClick}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
            />
            <span className="input-switch__label">{label}</span>
        </label>
    );
};
