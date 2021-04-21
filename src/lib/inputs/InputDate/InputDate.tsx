import React from 'react';
import { DatePicker, DatePickerProps, LocalizationProvider } from '@material-ui/pickers';
import { InputText } from '../InputText/InputText';
import { InputProps } from '../InputBase';
import LuxonUtils from '@date-io/luxon';
import { DateTime } from 'luxon';
import { get as _get } from 'lodash';
import classNames from 'classnames';

export type InputDateProps = InputProps & {
  value?: Date | string;
  onChange?: (date: Date | string | null) => void;
  inputFormat?: string;
  valueFormat?: string;
  disablePast?: boolean;
  className?: string;
  datePickerProps?: DatePickerProps;
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

export const InputDate: React.FC<InputDateProps> = ({
  label = 'Select Date',
  value,
  onChange,
  formikProps,
  inputFormat = 'LL/dd/yyyy',
  disablePast = false,
  valueFormat,
  className,
  datePickerProps = {} as DatePickerProps,
  ...props
}) => {
  datePickerProps.label = label;

  const initialFieldValue = formikProps ? _get(formikProps?.values, props.name, '') : value;
  datePickerProps.value = initialFieldValue ? toDateTime(initialFieldValue, valueFormat) : null;

  datePickerProps.onChange = (updatedDate: unknown, keyboardInputValue?: string | undefined) => {
    const updatedValue = fromDateTime(updatedDate as DateTime | null, valueFormat);
    if (formikProps?.setFieldValue) formikProps.setFieldValue(props.name, updatedValue);
    if (typeof onChange === 'function') onChange(updatedValue);
  };

  datePickerProps.inputFormat = valueFormat || inputFormat;

  datePickerProps.disablePast = disablePast;

  return (
    <LocalizationProvider dateAdapter={LuxonUtils}>
      <DatePicker
        {...datePickerProps}
        renderInput={renderProps => (
          <InputText
            {...(renderProps as InputProps)}
            {...props}
            formikProps={formikProps}
            className={classNames('lc-input-date', className)}
          />
        )}
      />
    </LocalizationProvider>
  );
};
