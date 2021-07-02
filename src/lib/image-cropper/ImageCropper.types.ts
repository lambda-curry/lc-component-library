import { Crop, ReactCropProps } from 'react-image-crop';
import { FileUpload } from '../file-uploader/FileUploader.types';

export interface CroppedImage {
  file: File;
  preview: string;
  height: number;
  width: number;
}

export interface ImageCropperProps extends Partial<ReactCropProps> {
  file?: FileUpload | null;
  src?: string;
  mimeType?: string;
  fileName?: string;
  quality?: number;
  isOpen?: boolean;
  onSave?: (croppedImage: CroppedImage | null) => void;
  onCancel?: () => void;
  onAfterOpen?: () => void;
  onAfterClose?: () => void;
  initialCrop?: Crop;
}
