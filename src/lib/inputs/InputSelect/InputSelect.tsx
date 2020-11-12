import React, { useState } from 'react';
import { Autocomplete, AutocompleteChangeDetails, AutocompleteChangeReason, AutocompleteProps } from '@material-ui/lab';
import { Paper } from '@material-ui/core';
import classNames from 'classnames';
import { InputText, Icon } from '../..';
import { InputProps } from '../InputBase';
import { isEqual, get } from 'lodash';

import './input-select.scss';
import { isNullOrUndefined } from '../../util/js-helpers';

export type AutoCompleteChange = (
  event: React.ChangeEvent<{}>,
  value: any,
  reason: AutocompleteChangeReason,
  details?: AutocompleteChangeDetails<any> | undefined
) => void;

export type InputSelectProps = Omit<InputProps, 'onChange'> & {
  value?: { [x: string]: any };
  options: any[];
  optionLabelKey?: string;
  optionValueKey?: string;
  autocompleteConfig?: Partial<AutocompleteProps<any, boolean, boolean, boolean>>;
  onChange?: AutoCompleteChange;
};

export const InputSelect: React.FC<InputSelectProps> = ({
  options,
  optionLabelKey = 'label',
  optionValueKey,
  name,
  className,
  autocompleteConfig,
  onChange,
  ...props
}) => {
  const getOptionSelected = (option: any, value: any) => {
    // Note: Sometimes we pass in the value as true value and sometimes value is the selected option.
    // if (optionValueKey) console.log('>>>', optionValueKey, option, value, option[optionValueKey] === value);
    return optionValueKey ? option[optionValueKey] === value || isEqual(option, value) : isEqual(option, value);
  };

  const initialValue = isNullOrUndefined(props.formikProps?.values[name])
    ? props.value
    : props.formikProps?.values[name];
  // Note: If no value is passed initialValue should be initialized as null instead of undefined to help with uncontrolled component warning
  // https://github.com/mui-org/material-ui/issues/18173#issuecomment-552420187

  const [inputTextValue, setInputTextValue] = useState(
    (optionValueKey ? options.find(option => getOptionSelected(option, initialValue)) : initialValue) || null
  );

  const handleChange: (
    event: React.ChangeEvent<{}>,
    value: any,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<any> | undefined
  ) => void = (event, value, reason, details) => {
    const fieldValue = optionValueKey && value ? value[optionValueKey] : value;
    setInputTextValue(value);
    if (props.formikProps && fieldValue) props.formikProps.setFieldValue(name, fieldValue);
    if (typeof onChange === 'function' && fieldValue) onChange(event, fieldValue, reason, details);
  };

  const autocompleteProps: AutocompleteProps<any, boolean, boolean, boolean> = {
    options,
    multiple: false,
    value: inputTextValue,
    openOnFocus: true,
    closeIcon: <Icon className="input-select-icon-close" name="close" />,
    popupIcon: <Icon className="input-select-icon-popup" name="chevronDown" />,
    ChipProps: { deleteIcon: <Icon name="close" /> },
    renderInput:
      !optionValueKey || props.formikProps
        ? inputProps => <InputText name={name} {...inputProps} {...props} />
        : inputProps => (
            <>
              <input name={name} type="hidden" value={props.value ? props.value[optionValueKey] : null} />
              <InputText name={`_${name}`} {...inputProps} {...props} />
            </>
          ),
    PaperComponent: props => <Paper className="input-select-paper" {...props} />,
    getOptionSelected,
    getOptionLabel: (option: { [key: string]: any }) => get(option, optionLabelKey) || '',
    onChange: handleChange,
    ...autocompleteConfig
  };

  return <Autocomplete className={classNames('input-select', className)} {...autocompleteProps} />;
};
