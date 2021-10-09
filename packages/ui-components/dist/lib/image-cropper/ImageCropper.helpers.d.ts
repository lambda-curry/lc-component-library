import { Crop } from 'react-image-crop';
import { CroppedImage } from './ImageCropper.types';
export declare function getCroppedImage({ image, crop, fileName, mimeType, quality }: {
    image: HTMLImageElement;
    crop: Crop;
    fileName?: string;
    mimeType?: string;
    quality?: number;
}): Promise<CroppedImage>;
export declare const blobToFile: (blob: Blob, fileName: string) => File;
export declare const fetchFileFromURL: (url: string, fileName?: string, mimeType?: string) => Promise<File>;
