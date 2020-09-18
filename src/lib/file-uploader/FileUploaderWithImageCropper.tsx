import React, { FC, useState } from 'react';
import { DropEvent } from 'react-dropzone';
import { FormikProps } from 'formik';
import { FileUploader, FileUploaderProps, FileUpload, ImageCropper, ImageCropperProps, CroppedImage } from '..';

export interface FileUploaderWithImageCropperProps {
    name: string;
    formikProps: FormikProps<{}>;
    imageCropperProps?: Partial<ImageCropperProps>;
    fileUploaderProps?: Partial<FileUploaderProps>;
}

export const FileUploaderWithImageCropper: FC<FileUploaderWithImageCropperProps> = ({
    name,
    formikProps,
    fileUploaderProps = {},
    imageCropperProps = {}
}) => {
    const { onDropAccepted, ...restFileUploaderProps } = fileUploaderProps;
    const { onSave: onCropSave, ...restImageCropperProps } = imageCropperProps;

    const initialCropState = {
        open: false
    };

    const [crop, setCrop] = useState<{ open: boolean; file?: FileUpload }>(initialCropState);

    const handleDropAccepted = (acceptedFiles: FileUpload[], event: DropEvent) => {
        const file = acceptedFiles[0];
        setCrop({ open: true, file });

        if (onDropAccepted) {
            onDropAccepted(acceptedFiles, event);
        }
    };

    const handleCropSave = (newCroppedImage: CroppedImage) => {
        formikProps.setFieldValue(name, [newCroppedImage]);

        if (onCropSave) {
            onCropSave(newCroppedImage);
        }
    };

    return (
        <>
            <FileUploader
                name={name}
                formikProps={formikProps}
                onDropAccepted={handleDropAccepted}
                {...restFileUploaderProps}
            />
            <ImageCropper
                isOpen={crop.open}
                file={crop.file}
                mimeType={crop.file?.type}
                fileName={crop.file?.name}
                onAfterClose={() => setCrop(initialCropState)}
                onSave={handleCropSave}
                {...restImageCropperProps}
            />
        </>
    );
};
