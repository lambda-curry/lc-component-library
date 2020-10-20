import React, { FocusEvent } from 'react';
import { DatePicker, LocalizationProvider } from '@material-ui/pickers';
import { InputText } from '../InputText/InputText';
import { InputProps } from '../InputBase';
import LuxonUtils from '@date-io/luxon';
import { DateTime } from 'luxon';
import { get as _get } from 'lodash';

export type InputDateProps = InputProps & {
  value?: Date;
  onChange?: (date: Date | null) => void;
  inputFormat?: string;
  disablePast: boolean;
};

export const InputDate: React.FC<InputDateProps> = ({
  label = 'Select Date',
  value,
  onChange,
  formikProps,
  inputFormat = 'LL/dd/yyyy',
  disablePast = false,
  ...props
}) => {
  const fieldValue = _get(formikProps?.values, props.name, '');

  const handleChange = (updatedDate: DateTime | null, keyboardInputValue?: string | undefined) => {
    const newValue = updatedDate ? updatedDate.toJSDate() : null;
    if (formikProps) formikProps.setFieldValue(props.name, newValue);
    if (typeof onChange === 'function') onChange(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={LuxonUtils}>
      <DatePicker
        label={label}
        value={fieldValue || value}
        onChange={handleChange}
        inputFormat={inputFormat}
        disablePast={disablePast}
        renderInput={renderProps => <InputText {...(renderProps as InputProps)} {...props} formikProps={formikProps} />}
      />
    </LocalizationProvider>
  );
};
