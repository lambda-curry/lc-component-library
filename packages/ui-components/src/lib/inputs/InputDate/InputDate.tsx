import React, { FC } from 'react';
import { DateTime } from 'luxon';
import _get from 'lodash/get';
import classNames from 'classnames';
import { DatePicker, DatePickerProps, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { useFormContext } from '../../hooks';
import { InputText } from '../InputText/InputText';
import { InputProps } from '../InputBase';
import { useEffect } from 'react';

export type InputDateProps = Omit<InputProps, 'onChange'> & {
  value?: Date | string;
  onChange?: (date: Date | string | null) => void;
  inputFormat?: string;
  valueFormat?: string;
  disablePast?: boolean;
  className?: string;
  datePickerProps?: Partial<DatePickerProps<DateTime, DateTime>>;
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
  const fieldDateTime = valueFormat ? DateTime.fromFormat(fieldValue, valueFormat) : DateTime.fromJSDate(fieldValue);
  const [inputValue, setInputValue] = React.useState<DateTime | null>(fieldValue);

  useEffect(() => {
    if (fieldDateTime.isValid || fieldValue === '' || fieldValue === null) {
      setInputValue(fieldValue ? fieldValue : null);
    }
  }, [fieldValue]);

  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <DatePicker
        {...datePickerProps}
        label={label}
        value={inputValue}
        onChange={(dateTime: DateTime | null, keyboardInputValue?: string | undefined) => {
          if (!dateTime) return setInputValue(null);

          const dateValue = valueFormat ? dateTime.toFormat(valueFormat) : dateTime.startOf('day').toJSDate();

          if (formikProps?.setFieldValue) {
            if (!dateTime.isValid) {
              formikProps.setFieldValue(props.name, keyboardInputValue);
            } else {
              formikProps.setFieldValue(props.name, dateValue);
            }
          }

          if (dateTime.isValid && typeof onChange === 'function') onChange(dateValue);
          setInputValue(dateTime);
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
            className={classNames('lc-input-date', className)}
          />
        )}
      />
    </LocalizationProvider>
  );
};
