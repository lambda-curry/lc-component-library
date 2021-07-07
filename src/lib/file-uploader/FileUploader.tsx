// Vendors
import React, { FC, useEffect } from 'react';
import { useDropzone, FileRejection, DropEvent, DropzoneOptions } from 'react-dropzone';
import { get as _get } from 'lodash';
import classNames from 'classnames';

// Components
import { ButtonUnstyled } from '../buttons/ButtonUnstyled';
import { ButtonAccent } from '../buttons/ButtonAccent';
import { ButtonLink } from '../buttons/ButtonLink';
import { Icon } from '../icon/Icon';

// Helpers
import { formatBytes, formatMimeTypesForDisplay } from './FileUploader.helpers';

// Assets
import placeholderImage from '../../assets/file-uploader-placeholder.png';

// Styles
import './file-uploader.css';

// Types
import { FileUpload, FileUploaderProps } from './FileUploader.types';

export const FileUploader: FC<FileUploaderProps> = ({
  name,
  className,
  maxSize = 1048576, // 1 MB
  minSize,
  // TODO: Consider allowing file extensions in addition to mime-types
  accept = ['image/jpeg', 'image/png', 'image/gif'],
  multiple = false,
  disabled,
  dropzoneText,
  dropzoneActiveText,
  dropzoneAcceptText,
  dropzoneRejectText,
  formikProps,
  onDrop,
  onDropAccepted,
  onDropRejected,
  onClearAll,
  onRemoveFile,
  ...props
}) => {
  const files = formikProps ? _get(formikProps?.values, name) || [] : props.value || [];
  const error = formikProps ? _get(formikProps?.errors, name) : props.error || '';

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const processFile = (acceptedFile: File): FileUpload => {
    return Object.assign(acceptedFile, { preview: URL.createObjectURL(acceptedFile) });
  };

  const processMultipleFiles = (acceptedFiles: File[]): FileUpload[] => {
    const newFiles = [...(multiple ? files : []), ...acceptedFiles.map((file: any) => processFile(file))];

    // Remove duplicate files
    const uniqueNewFiles = newFiles.reduce((acc, curr) => {
      acc[curr.path] = curr;
      return acc;
    }, {});

    return Object.values(uniqueNewFiles);
  };

  const handleDrop = (acceptedFiles: File[], rejectedFiles: FileRejection[], event: DropEvent) => {
    const newFiles = processMultipleFiles(acceptedFiles);

    if (formikProps?.setFieldValue) formikProps.setFieldValue(name, newFiles);
    if (formikProps?.setFieldError) formikProps.setFieldError(name, '');

    if (onDrop) onDrop(newFiles, rejectedFiles, event);

    if (onDropAccepted) onDropAccepted(newFiles, event);

    if (onDropRejected) onDropRejected(rejectedFiles, event);
  };

  const clearAll = () => {
    if (formikProps?.setFieldValue) formikProps.setFieldValue(name, []);
    if (formikProps?.setFieldError) formikProps.setFieldError(name, undefined);

    if (onClearAll) onClearAll();
  };

  const removeFile = (event: React.MouseEvent<any, MouseEvent>, index: number) => {
    event.stopPropagation();

    const newFiles: FileUpload[] = [...files];
    const removedFile = newFiles.splice(index, 1)[0];

    if (formikProps?.setFieldValue) formikProps.setFieldValue(name, newFiles);

    if (onRemoveFile) onRemoveFile(index, removedFile, newFiles);
  };

  const dropzoneOptions: DropzoneOptions = {
    maxSize,
    minSize,
    accept,
    multiple,
    disabled,
    onDrop: handleDrop
  };

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject, open } = useDropzone(dropzoneOptions);

  const getDropzoneText = () => {
    if (isDragAccept) return dropzoneAcceptText || `${multiple ? 'All files' : 'The file'} will be accepted.`;

    if (isDragReject) return dropzoneRejectText || `${multiple ? 'Some files' : 'The file'} will be rejected.`;

    if (isDragActive) return dropzoneActiveText || `Drop the file${multiple && 's'} here...`;

    return (
      dropzoneText ||
      `Drag 'n drop ${multiple ? 'some files' : 'a file'} here, or click to select ${multiple ? 'some' : 'one'}.`
    );
  };

  const dropzoneClassName = classNames('lc-file-uploader-dropzone', {
    'lc-file-uploader-dropzone-active': isDragActive,
    'lc-file-uploader-dropzone-accept': isDragAccept,
    'lc-file-uploader-dropzone-reject': isDragReject
  });

  return (
    <>
      <div
        className={classNames('lc-file-uploader', className, {
          'lc-file-uploader-disabled': disabled
        })}
      >
        <div {...getRootProps({ className: dropzoneClassName })}>
          <input name={name} {...getInputProps()} />

          {files && files.length > 0 && (
            <ul className="lc-file-uploader-dropzone-files">
              {files.map((file: FileUpload, index: number) => (
                <li key={index}>
                  <ButtonUnstyled
                    className="lc-file-uploader-dropzone-file"
                    onClick={event => removeFile(event, index)}
                  >
                    <div className="lc-file-uploader-dropzone-file-thumb">
                      <img
                        src={file.preview}
                        alt="File upload preview"
                        className="lc-file-uploader-dropzone-file-thumb-image"
                      />
                      <div className="lc-file-uploader-dropzone-file-thumb-overlay">
                        <Icon name="trash" className="lc-file-uploader-dropzone-file-remove-icon" />
                      </div>
                    </div>

                    {multiple && file.name && <div className="lc-file-uploader-dropzone-file-name">{file.name}</div>}
                  </ButtonUnstyled>
                </li>
              ))}
            </ul>
          )}

          {(!files || files.length < 1) && (
            <>
              <img
                alt="File upload placeholder"
                src={placeholderImage}
                className="lc-file-uploader-dropzone-placeholder"
              />
              <div className="lc-file-uploader-dropzone-text">{getDropzoneText()}</div>
            </>
          )}
        </div>

        <div className="lc-file-uploader-footer">
          <div className="lc-file-uploader-actions">
            <ButtonAccent onClick={open}>Choose File{multiple && 's'}</ButtonAccent>
            {((files && files.length > 0) || error) && (
              <ButtonLink onClick={clearAll} style={{ marginLeft: '12px' }}>
                Clear {multiple && <>All</>}
              </ButtonLink>
            )}
          </div>

          <div className="lc-flex-1" />

          <div className="lc-file-uploader-restrictions">
            {accept && <>{formatMimeTypesForDisplay(accept)}. </>}
            {maxSize && <>Max size of {formatBytes(maxSize)}. </>}
            {minSize && <>Min size of {formatBytes(minSize)}.</>}
          </div>
        </div>
      </div>
    </>
  );
};
