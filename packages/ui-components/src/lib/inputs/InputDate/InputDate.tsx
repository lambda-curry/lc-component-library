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
  console.log('>>>> onChange', dt);
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
  console.log('>>> fieldValue', fieldValue);
  // console.log(`>>> values ${props.name}:`, JSON.stringify(formikProps?.values));
  // console.log(`>>> errors ${props.name}:`, JSON.stringify(formikProps?.errors));

  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <DatePicker
        {...datePickerProps}
        label={label}
        value={fieldValue}
        onChange={(updatedDate: DateTime | null, keyboardInputValue?: string | undefined) => {
          console.log('>>>> onChange', updatedDate?.isValid, keyboardInputValue);

          const updatedValue = updatedDate?.isValid ? fromDateTime(updatedDate, valueFormat) : keyboardInputValue;

          if (!updatedValue) return;

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
