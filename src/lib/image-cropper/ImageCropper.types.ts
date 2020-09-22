import { Crop } from 'react-image-crop';
import { FileUpload } from '..';

export interface CroppedImage {
    file: File;
    preview: string;
    height: number;
    width: number;
}

export interface ImageCropperProps {
    file?: FileUpload;
    src?: string;
    mimeType?: string;
    fileName?: string;
    quality?: number;
    isOpen: boolean;
    onSave?: (croppedImage: CroppedImage | null) => void;
    onCancel?: () => void;
    onAfterOpen?: () => void;
    onAfterClose?: () => void;
    initialCrop?: Crop;
}
