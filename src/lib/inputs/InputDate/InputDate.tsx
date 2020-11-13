import React from 'react';
import { DatePicker, LocalizationProvider } from '@material-ui/pickers';
import { InputText } from '../InputText/InputText';
import { InputProps } from '../InputBase';
import LuxonUtils from '@date-io/luxon';
import { DateTime } from 'luxon';
import { get as _get } from 'lodash';

export type InputDateProps = InputProps & {
  value?: Date | string;
  onChange?: (date: Date | string | null) => void;
  inputFormat?: string;
  valueFormat?: string;
  disablePast: boolean;
};

const toDateTime = (value: string | Date, format?: string) => {
  if (format && typeof value === 'string') return DateTime.fromFormat(value, format);
  if (value instanceof Date) return DateTime.fromJSDate(value);
};

const fromDateTime = (dt: DateTime | null, format?: string) => {
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
  ...props
}) => {
  const initialFieldValue = formikProps ? _get(formikProps?.values, props.name, '') : value;
  const fieldValue = toDateTime(initialFieldValue, valueFormat);

  const handleChange = (updatedDate: DateTime | null, keyboardInputValue?: string | undefined) => {
    const updatedValue = fromDateTime(updatedDate, valueFormat);
    if (formikProps) formikProps.setFieldValue(props.name, updatedValue);
    if (typeof onChange === 'function') onChange(updatedValue);
  };

  return (
    <LocalizationProvider dateAdapter={LuxonUtils}>
      <DatePicker
        label={label}
        value={fieldValue}
        onChange={handleChange}
        inputFormat={valueFormat || inputFormat}
        disablePast={disablePast}
        renderInput={renderProps => <InputText {...(renderProps as InputProps)} {...props} formikProps={formikProps} />}
      />
    </LocalizationProvider>
  );
};
