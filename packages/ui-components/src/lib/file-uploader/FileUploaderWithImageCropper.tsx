// Vendors
import React, { FC, useState } from 'react';
import { DropEvent } from 'react-dropzone';

// Components
import { FileUploader } from './FileUploader';
import { ImageCropper } from '../image-cropper/ImageCropper';

// Types
import { FileUpload, FileUploaderWithImageCropperProps } from './FileUploader.types';
import { CroppedImage } from '../image-cropper/ImageCropper.types';

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

    if (onDropAccepted) onDropAccepted(acceptedFiles, event);
  };

  const handleCropSave = (newCroppedImage: CroppedImage | null) => {
    if (formikProps?.setFieldValue) formikProps.setFieldValue(name, [newCroppedImage]);

    if (onCropSave) onCropSave(newCroppedImage);
  };

  const handleCropCancel = () => {
    if (formikProps?.setFieldValue) formikProps.setFieldValue(name, []);
  };

  return (
    <>
      <FileUploader
        name={name}
        formikProps={formikProps}
        onDropAccepted={handleDropAccepted}
        multiple={false}
        {...restFileUploaderProps}
      />
      <ImageCropper
        isOpen={crop.open}
        file={crop.file}
        mimeType={crop.file?.type}
        fileName={crop.file?.name}
        onAfterClose={() => setCrop(initialCropState)}
        onSave={handleCropSave}
        onCancel={handleCropCancel}
        {...restImageCropperProps}
      />
    </>
  );
};
