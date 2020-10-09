import React, { FocusEvent } from 'react';
import { DatePicker, LocalizationProvider } from '@material-ui/pickers';
import { InputText } from '../InputText/InputText';
import { InputProps } from '../InputBase';
import LuxonUtils from '@date-io/luxon';
import { DateTime } from 'luxon';

export const InputDate: React.FC<InputProps & { value?: Date; onChange: (date: Date) => void }> = ({
  label = 'Select Date',
  value,
  onChange,
  formikProps,
  ...props
}) => {
  const handleChange = (updatedDate: DateTime | null, keyboardInputValue?: string | undefined) => {
    if (!updatedDate) return;

    if (formikProps) formikProps.setFieldValue(props.name, updatedDate.toJSDate());
    if (typeof onChange === 'function') onChange(updatedDate.toJSDate());
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (typeof props.onBlur === 'function') props.onBlur(event);
    if (formikProps) formikProps.handleBlur(event);
  };

  return (
    <LocalizationProvider dateAdapter={LuxonUtils}>
      <DatePicker
        label={label}
        value={formikProps ? formikProps.values[props.name] : value}
        onChange={handleChange}
        renderInput={renderProps => <InputText {...(renderProps as InputProps)} {...props} onBlur={handleBlur} />}
      />
    </LocalizationProvider>
  );
};
