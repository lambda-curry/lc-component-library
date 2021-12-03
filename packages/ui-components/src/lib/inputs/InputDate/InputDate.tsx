import React, { FC } from 'react';
import { InputText } from '../InputText/InputText';
import { InputProps } from '../InputBase';
import LuxonUtils from '@date-io/luxon';
import { DateTime } from 'luxon';
import { get as _get } from 'lodash';
import classNames from 'classnames';
import { DatePicker, DatePickerProps, LocalizationProvider } from '@mui/lab';

export type InputDateProps = Omit<InputProps, 'onChange'> & {
  value?: Date | string;
  onChange?: (date: Date | string | null) => void;
  inputFormat?: string;
  valueFormat?: string;
  disablePast?: boolean;
  className?: string;
  datePickerProps?: Partial<DatePickerProps>;
};

const toDateTime = (value: string | Date, format?: string): DateTime | null => {
  if (format && typeof value === 'string') return DateTime.fromFormat(value, format);
  if (value instanceof Date) return DateTime.fromJSDate(value);
  return null;
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
  const initialFieldValue = formikProps ? _get(formikProps?.values, props.name, '') : value;

  return (
    <LocalizationProvider dateAdapter={LuxonUtils}>
      <DatePicker
        {...datePickerProps}
        label={label}
        value={initialFieldValue ? toDateTime(initialFieldValue, valueFormat) : null}
        onChange={(updatedDate: unknown, keyboardInputValue?: string | undefined) => {
          const updatedValue = fromDateTime(updatedDate as DateTime | null, valueFormat);
          if (formikProps?.setFieldValue) formikProps.setFieldValue(props.name, updatedValue);
          if (typeof onChange === 'function') onChange(updatedValue);
        }}
        inputFormat={valueFormat || inputFormat}
        disablePast={disablePast}
        renderInput={(renderProps: any) => (
          <InputText
            {...renderProps}
            {...props}
            formikProps={formikProps}
            className={classNames('lc-input-date', className)}
          />
        )}
      />
    </LocalizationProvider>
  );
};
