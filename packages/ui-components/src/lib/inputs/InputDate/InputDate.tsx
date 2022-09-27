import React, { FC } from 'react';
import { DateTime } from 'luxon';
import _get from 'lodash/get';
import classNames from 'classnames';
import { DatePicker, DatePickerProps, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { useFormContext } from '../../hooks';
import { InputText } from '../InputText/InputText';
import { InputProps } from '../InputBase';

export type InputDateProps = Omit<InputProps, 'onChange'> & {
  value?: Date | string;
  onChange?: (date: Date | string | null) => void;
  inputFormat?: string;
  valueFormat?: string;
  disablePast?: boolean;
  className?: string;
  datePickerProps?: Partial<DatePickerProps<DateTime, DateTime>>;
};

const fromDateTime = (dt: DateTime | null, format?: string): Date | string | null => {
  if (!dt) return null;
  if (format) return dt.toFormat(format);
  return dt.toJSDate();
};

export const InputDate: FC<InputDateProps> = ({
  label = 'Select Date',
  value,
  onChange,
  formikProps,
  inputFormat = 'LL/dd/yyyy',
  disablePast = false,
  valueFormat,
  className,
  datePickerProps = {},
  ...props
}) => {
  const formContext = useFormContext();
  if (!formikProps && formContext) formikProps = formContext;

  const fieldValue = formikProps ? _get(formikProps?.values, props.name, '') : value;

  console.log(`>>> ${props.name}`, formikProps?.errors);

  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <DatePicker
        {...datePickerProps}
        label={label}
        value={fieldValue}
        onChange={(updatedDate: DateTime | null, keyboardInputValue?: string | undefined) => {
          const updatedValue = fromDateTime(updatedDate as DateTime | null, valueFormat);
          if (formikProps?.setFieldValue) formikProps.setFieldValue(props.name, updatedValue);
          if (typeof onChange === 'function') onChange(updatedValue);
        }}
        inputFormat={inputFormat || valueFormat}
        disablePast={disablePast}
        renderInput={(renderProps: any) => (
          <InputText
            {...renderProps}
            {...props}
            error={
              props.error ||
              (formikProps?.errors && formikProps?.errors[props.name]) ||
              (formikProps?.values && formikProps?.values[props.name] === 'Invalid DateTime')
            }
            formikProps={formikProps}
            className={classNames('lc-input-date', className)}
          />
        )}
      />
    </LocalizationProvider>
  );
};
