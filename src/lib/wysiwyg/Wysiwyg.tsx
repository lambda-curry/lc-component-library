import React, { useEffect, FunctionComponent, useState } from 'react';
import ReactQuill, { ReactQuillProps, QuillOptions } from 'react-quill';
import { FormikProps } from 'formik';
import { get as _get } from 'lodash';
import { stripTags } from '../util/formatters';
import { MultilineInput } from '..';

import 'react-quill/dist/quill.snow.css';
import './wysiwyg.scss';

interface WysiwygProps extends ReactQuillProps {
  name: string;
  formikProps: FormikProps<{}>;
  templateVariables?: string[];
  characterLimit?: number;
}

const quillConfig: QuillOptions = {
  theme: 'snow',
  modules: {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'link'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ align: [] }],
        ['clean'],
        [{ placeholder: ['{{Example Placeholder 1}}', '{{Example Placeholder 2}}'] }]
      ],
      handlers: {
        placeholder: function (value: any) {
          if (!value) {
            return;
          }

          const wrapper = this as any;
          const cursorPosition = wrapper.quill.getSelection().index;
          wrapper.quill.insertText(cursorPosition, value);
          wrapper.quill.setSelection(cursorPosition + value.length);
        }
      }
    }
  }
};

export const Wysiwyg: FunctionComponent<WysiwygProps> = ({
  placeholder = 'Enter your text here...',
  characterLimit = 0,
  formikProps,
  ...props
}) => {
  const fieldValue = _get(formikProps.values, props.name);

  useEffect(() => {
    // We need to manually supply the HTML content of our custom dropdown list
    const placeholderPickerItems = document.querySelectorAll('.ql-placeholder .ql-picker-item');

    placeholderPickerItems.forEach((item: any) => (item.textContent = item.dataset.value));
    const quillPlaceholderLabel = document.querySelector('.ql-placeholder .ql-picker-label');
    if (quillPlaceholderLabel) {
      quillPlaceholderLabel.innerHTML =
        'Insert placeholder&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
        document.querySelector('.ql-placeholder .ql-picker-label')?.innerHTML;
    }
  }, []);

  return (
    <MultilineInput value={fieldValue} characterLimit={characterLimit}>
      {({ previousValue, characterCount }) => {
        const handleChange = (value: string) => {
          let newValue = value;
          const newValueLength = newValue.length;
          const previousValueLength = previousValue.length;

          // Enforce the character limit if it is set
          if (characterLimit && newValueLength > previousValueLength && characterCount >= characterLimit) {
            newValue = previousValue;
          }

          // Make sure we set a true empty value to avoid saving extra
          // space when the editor is cleared out.
          if (newValue === '<p><br></p>') {
            newValue = '';
          }

          formikProps.setFieldValue(props.name, newValue);
        };

        return (
          <ReactQuill
            className="wysiwyg-editor"
            placeholder={placeholder}
            theme={quillConfig.theme}
            modules={quillConfig.modules}
            value={fieldValue}
            onChange={handleChange}
            {...props}
          />
        );
      }}
    </MultilineInput>
  );
};
