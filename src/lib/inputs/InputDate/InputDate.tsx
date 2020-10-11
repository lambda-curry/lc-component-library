import React, { FocusEvent } from 'react';
import { DatePicker, LocalizationProvider } from '@material-ui/pickers';
import { InputText } from '../InputText/InputText';
import { InputProps } from '../InputBase';
import LuxonUtils from '@date-io/luxon';
import { DateTime } from 'luxon';
import { get as _get } from 'lodash';

export type InputDateProps = InputProps & {
  value?: Date;
  onChange?: (date: Date) => void;
};

export const InputDate: React.FC<InputDateProps> = ({
  label = 'Select Date',
  value,
  onChange,
  formikProps,
  ...props
}) => {
  const fieldValue = _get(formikProps?.values, name, '');

  const handleChange = (updatedDate: DateTime | null, keyboardInputValue?: string | undefined) => {
    if (!updatedDate) return;

    if (formikProps) formikProps.setFieldValue(props.name, updatedDate.toJSDate());
    if (typeof onChange === 'function') onChange(updatedDate.toJSDate());
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (formikProps) formikProps.handleBlur(event);
    if (typeof props.onBlur === 'function') props.onBlur(event);
  };

  return (
    <LocalizationProvider dateAdapter={LuxonUtils}>
      <DatePicker
        label={label}
        value={fieldValue || value}
        onChange={handleChange}
        renderInput={renderProps => <InputText {...(renderProps as InputProps)} {...props} onBlur={handleBlur} />}
      />
    </LocalizationProvider>
  );
};
