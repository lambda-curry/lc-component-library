import { FormikProps } from 'formik';
import { FileRejection, DropEvent } from 'react-dropzone';
import { ImageCropperProps } from '../image-cropper/ImageCropper.types';

export interface FileUpload extends File {
  preview: string;
}

export interface FileUploaderProps {
  name: string;
  className?: string;
  replaceOnly?: boolean;
  maxSize?: number;
  minSize?: number;
  accept?: string[];
  multiple?: boolean;
  disabled?: boolean;
  value?: FileUpload[];
  error?: string;
  formikProps?: Partial<FormikProps<any>>;
  dropzoneText?: string;
  dropzoneActiveText?: string;
  dropzoneAcceptText?: string;
  dropzoneRejectText?: string;
  onDrop?: (acceptedFiles: FileUpload[], rejectedFiles: FileRejection[], event: DropEvent) => void;
  onDropAccepted?: (acceptedFiles: FileUpload[], event: DropEvent) => void;
  onDropRejected?: (rejectedFiles: FileRejection[], event: DropEvent) => void;
  onRemoveFile?: (index: number, file: FileUpload, updatedFiles: FileUpload[]) => void;
  onClearAll?: () => void;
}

export interface FileUploaderWithImageCropperProps {
  name: string;
  formikProps?: Partial<FormikProps<any>>;
  imageCropperProps?: Partial<ImageCropperProps>;
  fileUploaderProps?: Partial<Omit<FileUploaderProps, 'formikProps' | 'multiple'>>;
}

export interface MimeTypesMap {
  [key: string]: {
    [key: string]: string;
  };
}
