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

// https://github.com/mui/material-ui/issues/30591#issuecomment-1377997824
class Adapter extends AdapterLuxon {
  public getWeekdays = () => {
    return ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  };

  getWeekArray = (date: DateTime) => {
    const { days } = date.endOf('month').endOf('week').diff(date.startOf('month').startOf('week'), 'days').toObject();

    let weeks: DateTime[][] = [];
    new Array(Math.round(days ?? 0))
      .fill(0)
      .map((_, i) => i)
      .map(day => date.startOf('month').startOf('week').minus({ days: 1 }).plus({ days: day }))
      .forEach((v, i) => {
        if (i === 0 || (i % 7 === 0 && i > 6)) {
          weeks.push([v]);
          return;
        }

        weeks[weeks.length - 1].push(v);
      });

    weeks = weeks.filter(week => {
      // do not allow weeks with start or end outside of current month
      return week[0].hasSame(date, 'month') || week[week.length - 1].hasSame(date, 'month');
    });

    return weeks;
  };
}

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
    <LocalizationProvider dateAdapter={Adapter}>
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
