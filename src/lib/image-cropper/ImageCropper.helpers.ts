import { Crop } from 'react-image-crop';
import { CroppedImage } from '.';

export function getCroppedImage({
    image,
    crop,
    fileName = 'new-file.jpg',
    mimeType = 'image/jpeg',
    quality = 0.85
}: {
    image: HTMLImageElement;
    crop: Crop;
    fileName?: string;
    mimeType?: string;
    quality?: number;
}): Promise<CroppedImage> {
    const cropWidth = crop.width || 0;
    const cropHeight = crop.height || 0;
    const cropPositionX = crop.x || 0;
    const cropPositionY = crop.y || 0;
    const isPercent = crop.unit === '%';
    const canvas = document.createElement('canvas');

    let scaleX = image.naturalWidth / image.width;
    let scaleY = image.naturalHeight / image.height;

    if (isPercent) {
        scaleX = 0.01 * image.naturalWidth;
        scaleY = 0.01 * image.naturalHeight;
    }

    const sx = Math.round(cropPositionX * scaleX);
    const sy = Math.round(cropPositionY * scaleY);
    const sWidth = Math.round(cropWidth * scaleX);
    const sHeight = Math.round(cropHeight * scaleY);
    const dWidth = Math.round(cropWidth * (isPercent ? scaleX : 1));
    const dHeight = Math.round(cropHeight * (isPercent ? scaleY : 1));

    canvas.width = dWidth;
    canvas.height = dHeight;

    const ctx = canvas.getContext('2d');

    if (!ctx) {
        return Promise.reject(new Error('No canvas context.'));
    }

    ctx.drawImage(image, sx, sy, Math.round(sWidth), sHeight, 0, 0, dWidth, dHeight);

    return new Promise((resolve, reject) => {
        canvas.toBlob(
            (blob: Blob) => {
                const file = blobToFile(blob, fileName);

                if (!blob) {
                    return reject(new Error('Canvas is empty'));
                }

                const preview = URL.createObjectURL(blob);

                resolve({ file, preview, width: dWidth, height: dHeight });
            },
            mimeType,
            quality
        );
    });
}

export function blobToFile(blob: Blob, fileName: string): File {
    const file: any = blob;

    file.lastModifiedDate = new Date();
    file.name = fileName;

    return file;
}
