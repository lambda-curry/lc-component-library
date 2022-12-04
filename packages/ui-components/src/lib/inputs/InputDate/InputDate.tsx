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
  const [inputValue, setInputValue] = React.useState<DateTime | null>(fieldValue);

  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <DatePicker
        {...datePickerProps}
        label={label}
        value={inputValue}
        onChange={(dateTime: DateTime | null, keyboardInputValue?: string | undefined) => {
          if (!dateTime) return setInputValue(dateTime);

          if (formikProps?.setFieldValue) {
            if (!dateTime.isValid) {
              formikProps.setFieldValue(props.name, keyboardInputValue);
              return setInputValue(dateTime);
            } else {
              if (valueFormat) formikProps.setFieldValue(props.name, dateTime.toFormat(valueFormat));
              else formikProps.setFieldValue(props.name, dateTime.toJSDate());
            }
          }

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
