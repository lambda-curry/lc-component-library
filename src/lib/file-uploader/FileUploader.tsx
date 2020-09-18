import React, { FC, useEffect } from 'react';
import { useDropzone, FileRejection, DropEvent, DropzoneOptions } from 'react-dropzone';
import classNames from 'classnames';
import { ButtonAccent, Icon } from '..';
import { FileUploaderProps, FileUpload, formatBytes, formatMimeTypesForDisplay } from '.';
import { ButtonUnstyled, ButtonLink } from '..';
import { get as _get } from 'lodash';
import placeholderImage from './file-uploader-placeholder.png';

import styles from './file-uploader.module.scss';

export const FileUploader: FC<FileUploaderProps> = ({
    name,
    className,
    maxSize = 1048576, // 1 MB
    minSize,
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
    const files = _get(formikProps.values, name) || [];
    const error = _get(formikProps.errors, name) || '';

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
        const uniqueNewFiles = Array.from(new Set(newFiles.map(a => a.path))).map(path =>
            newFiles.find(a => a.path === path)
        );

        return uniqueNewFiles;
    };

    const handleDrop = (acceptedFiles: File[], rejectedFiles: FileRejection[], event: DropEvent) => {
        const newFiles = processMultipleFiles(acceptedFiles);

        formikProps.setFieldValue(name, newFiles);
        formikProps.setFieldError(name, '');

        if (onDrop) {
            onDrop(newFiles, rejectedFiles, event);
        }

        if (onDropAccepted) {
            onDropAccepted(newFiles, event);
        }

        if (onDropRejected) {
            onDropRejected(rejectedFiles, event);
        }
    };

    const clearAll = () => {
        formikProps.setFieldValue(name, []);
        formikProps.setFieldError(name, '');

        if (onClearAll) {
            onClearAll();
        }
    };

    const removeFile = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => {
        event.stopPropagation();
        const newFiles: FileUpload[] = [...files];
        const removedFile = newFiles.splice(index, 1)[0];
        formikProps.setFieldValue(name, newFiles);

        if (onRemoveFile) {
            onRemoveFile(index, removedFile, newFiles);
        }
    };

    const dropzoneOptions: DropzoneOptions = {
        maxSize,
        minSize,
        accept,
        multiple,
        disabled,
        onDrop: handleDrop
    };

    const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject, open } = useDropzone(
        dropzoneOptions
    );

    const getDropzoneText = () => {
        if (isDragAccept) {
            return dropzoneAcceptText || `${multiple ? 'All files' : 'The file'} will be accepted.`;
        }

        if (isDragReject) {
            return dropzoneRejectText || `${multiple ? 'Some files' : 'The file'} will be rejected.`;
        }

        if (isDragActive) {
            return dropzoneActiveText || `Drop the file${multiple && 's'} here...`;
        }

        return (
            dropzoneText ||
            `Drag 'n drop ${multiple ? 'some files' : 'a file'} here, or click to select ${multiple ? 'some' : 'one'}.`
        );
    };

    const dropzoneClassName = classNames(styles['file-uploader-dropzone'], {
        [styles['file-uploader-dropzone-active']]: isDragActive,
        [styles['file-uploader-dropzone-accept']]: isDragAccept,
        [styles['file-uploader-dropzone-reject']]: isDragReject
    });

    return (
        <>
            <div
                className={classNames(styles['file-uploader'], className, {
                    [styles['file-uploader-disabled']]: disabled
                })}
            >
                <div className={dropzoneClassName} {...getRootProps()}>
                    <input name={name} {...getInputProps()} />

                    {files.length > 0 && (
                        <ul className={styles['file-uploader-dropzone-files']}>
                            {files.map((file: FileUpload, index: number) => (
                                <li key={index}>
                                    <ButtonUnstyled
                                        className={styles['file-uploader-dropzone-file']}
                                        onClick={event => removeFile(event, index)}
                                    >
                                        <div className={styles['file-uploader-dropzone-file-thumb']}>
                                            <img
                                                src={file.preview}
                                                alt="File upload preview"
                                                className={styles['file-uploader-dropzone-file-thumb-image']}
                                            />
                                            <div className={styles['file-uploader-dropzone-file-thumb-overlay']}>
                                                <Icon
                                                    name="trash"
                                                    className={styles['file-uploader-dropzone-file-remove-icon']}
                                                />
                                            </div>
                                        </div>

                                        {multiple && file.name && (
                                            <div className={styles['file-uploader-dropzone-file-name']}>
                                                {file.name}
                                            </div>
                                        )}
                                    </ButtonUnstyled>
                                </li>
                            ))}
                        </ul>
                    )}

                    {files.length < 1 && (
                        <>
                            <img
                                alt="File upload placeholder"
                                src={placeholderImage}
                                className={styles['file-uploader-dropzone-placeholder']}
                            />
                            <div className={styles['file-uploader-dropzone-text']}>{getDropzoneText()}</div>
                        </>
                    )}
                </div>

                <div className={styles['file-uploader-footer']}>
                    <div className={styles['file-uploader-actions']}>
                        <ButtonAccent onClick={open}>Choose File{multiple && 's'}</ButtonAccent>
                        {(files.length > 0 || error) && (
                            <ButtonLink onClick={clearAll} style={{ marginLeft: '12px' }}>
                                Clear All
                            </ButtonLink>
                        )}
                    </div>

                    <div className="flex-spacer" />

                    <div className={styles['file-uploader-restrictions']}>
                        {accept && <>{formatMimeTypesForDisplay(accept)}. </>}
                        {maxSize && <>Max size of {formatBytes(maxSize)}. </>}
                        {minSize && <>Min size of {formatBytes(minSize)}.</>}
                    </div>
                </div>
            </div>
        </>
    );
};
