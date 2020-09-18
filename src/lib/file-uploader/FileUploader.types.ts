import { FormikProps } from 'formik';
import { FileRejection, DropEvent } from 'react-dropzone';

export interface FileUpload extends File {
    preview: string;
}

export interface FileUploaderProps {
    name: string;
    className?: string;
    maxSize?: number;
    minSize?: number;
    accept?: string[];
    multiple?: boolean;
    disabled?: boolean;
    dropzoneText?: string;
    dropzoneActiveText?: string;
    dropzoneAcceptText?: string;
    dropzoneRejectText?: string;
    formikProps: FormikProps<{}>;
    onDrop?: (acceptedFiles: FileUpload[], rejectedFiles: FileRejection[], event: DropEvent) => void;
    onDropAccepted?: (acceptedFiles: FileUpload[], event: DropEvent) => void;
    onDropRejected?: (rejectedFiles: FileRejection[], event: DropEvent) => void;
    onRemoveFile?: (index: number, file: FileUpload, updatedFiles: FileUpload[]) => void;
    onClearAll?: () => void;
}
