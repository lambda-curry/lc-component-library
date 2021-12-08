import React, { FC } from 'react';
import { InputText } from '../InputText/InputText';
import { InputProps } from '../InputBase';
import { DateTime } from 'luxon';
import _get from 'lodash/get';
import classNames from 'classnames';
import DatePicker, { DatePickerProps } from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import LuxonAdapter from '@mui/lab/AdapterLuxon';

export type InputDateProps = Omit<InputProps, 'onChange'> & {
  value?: Date | string;
  onChange?: (date: Date | string | null) => void;
  inputFormat?: string;
  valueFormat?: string;
  disablePast?: boolean;
  className?: string;
  datePickerProps?: Partial<DatePickerProps<DateTime>>;
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
  const fieldValue = formikProps ? _get(formikProps?.values, props.name, '') : value;

  return (
    <LocalizationProvider dateAdapter={LuxonAdapter}>
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
            formikProps={formikProps}
            className={classNames('lc-input-date', className)}
          />
        )}
      />
    </LocalizationProvider>
  );
};
