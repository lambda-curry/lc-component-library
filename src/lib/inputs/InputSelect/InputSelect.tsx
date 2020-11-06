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
  const initialValue = isNullOrUndefined(props.formikProps?.values[name])
    ? props.value || null
    : props.formikProps?.values[name];
  const [inputTextValue, setInputTextValue] = useState(initialValue);
  const [fieldValue, setFieldValue] = useState(optionValueKey ? initialValue[optionValueKey] : initialValue);

  // Note: We want to remove the change event from the rendered component so it can be handled by the autocomplete
  if (props.formikProps) {
    props.formikProps.handleChange = () => {};
  }

  const handleChange: (
    event: React.ChangeEvent<{}>,
    value: any,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<any> | undefined
  ) => void = (event, value, reason, details) => {
    const fieldValue = optionValueKey ? value[optionValueKey] : value;
    setInputTextValue(value);
    setFieldValue(fieldValue);
    if (props.formikProps) props.formikProps.setFieldValue(name, fieldValue);
    if (typeof onChange === 'function') onChange(event, fieldValue, reason, details);
  };

  const autocompleteProps: AutocompleteProps<any, boolean, boolean, boolean> = {
    options,
    multiple: false,
    // Note: Value initialized as null instead of undefined to help with uncontrolled component warning
    // https://github.com/mui-org/material-ui/issues/18173#issuecomment-552420187
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
              <input name={name} type="hidden" value={props.value?[optionValueKey]} />
              <InputText name={`_${name}`} {...inputProps} {...props} />
            </>
          ),
    PaperComponent: props => <Paper className="input-select-paper" {...props} />,
    getOptionSelected: (option: any, value: any) => isEqual(option, value),
    getOptionLabel: (option: { [key: string]: any }) => get(option, optionLabelKey) || '',
    onChange: handleChange,
    ...autocompleteConfig
  };

  return <Autocomplete className={classNames('input-select', className)} {...autocompleteProps} />;
};
