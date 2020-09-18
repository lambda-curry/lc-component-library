import React, { FC, useState, useEffect } from 'react';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/lib/ReactCrop.scss';
import { Modal, Button, ButtonPrimary, Title } from '..';
import { formatBytes } from '..';
import { getCroppedImage, ImageCropperProps, CroppedImage } from '.';

import './image-cropper.scss';

export const ImageCropper: FC<ImageCropperProps & Partial<ReactCrop.ReactCropProps>> = ({
    src,
    file,
    mimeType = 'image/jpeg',
    fileName = 'newFile.jpg',
    quality = 0.85,
    isOpen,
    onSave,
    onCancel,
    onAfterOpen,
    onAfterClose,
    initialCrop = { unit: '%', width: 100, height: 100, y: 0, x: 0 },
    ruleOfThirds = true,
    ...props
}) => {
    const [crop, setCrop] = useState<Crop>(initialCrop);
    const [open, setOpen] = useState(isOpen);
    const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);
    const [croppedImage, setCroppedImage] = useState<CroppedImage | null>(null);
    const [cropping, setCropping] = useState(false);

    const cropSrc = file ? file.preview : src;
    const isPercent = initialCrop.unit === '%';

    useEffect(() => {
        setOpen(isOpen);
    }, [isOpen]);

    // TODO: We don't always want this to happen. So we probably want to add some way to control this outside the component
    useEffect(
        () => () => {
            // Make sure to revoke the data uris to avoid memory leaks
            if (croppedImage) {
                URL.revokeObjectURL(croppedImage.preview);
            }
        },
        [croppedImage]
    );

    const makeClientCrop = async (newCrop: Crop, imageRefOverride?: HTMLImageElement): Promise<CroppedImage | null> => {
        let newCroppedImage = null;
        const newImageRef = imageRefOverride || imageRef;

        if (!newImageRef) {
            return newCroppedImage;
        }

        setCropping(true);

        if (newImageRef && crop.width && crop.height) {
            newCroppedImage = await getCroppedImage({ image: newImageRef, crop: newCrop, fileName, mimeType });

            setCroppedImage(newCroppedImage);
        }

        setCropping(false);

        return newCroppedImage;
    };

    const handleAfterOpen = async () => {
        if (onAfterOpen) {
            onAfterOpen();
        }
    };

    const handleAfterClose = () => {
        setCrop(initialCrop);

        if (onAfterClose) {
            onAfterClose();
        }
    };

    const handleCropChange = (newCrop: Crop, newPercentCrop: Crop) => {
        setCrop(isPercent ? newPercentCrop : newCrop);
    };

    const handleCropComplete = async (newCrop: Crop, newPercentCrop: Crop) => {
        await makeClientCrop(isPercent ? newPercentCrop : newCrop);
    };

    const handleImageLoaded = async (newImage: HTMLImageElement) => {
        setImageRef(newImage);
        await makeClientCrop(initialCrop, newImage);
        return false;
    };

    const cleanup = () => {
        setCrop(initialCrop);
        setImageRef(null);
    };

    const handleCancel = () => {
        setOpen(false);
        cleanup();

        if (onCancel) {
            onCancel();
        }
    };

    const handleSave = async () => {
        let newCroppedImage = croppedImage;

        newCroppedImage = await makeClientCrop(crop);

        setOpen(false);
        cleanup();

        if (onSave) {
            onSave(newCroppedImage);
        }
    };

    if (!cropSrc) {
        return null;
    }

    return (
        <Modal
            className={'image-cropper-modal'}
            isOpen={open}
            onAfterOpen={handleAfterOpen}
            onAfterClose={handleAfterClose}
            closeButton={false}
        >
            <Title className={'image-cropper-title'}>Crop your image</Title>

            <div className={'image-cropper-cropper'}>
                <ReactCrop
                    {...props}
                    src={cropSrc}
                    crop={crop}
                    onChange={handleCropChange}
                    onComplete={handleCropComplete}
                    onImageLoaded={handleImageLoaded}
                    ruleOfThirds={ruleOfThirds}
                    crossorigin="anonymous"
                />
            </div>

            <div className={'image-cropper-footer'}>
                {croppedImage && croppedImage.preview && (
                    <div className={'image-cropper-preview'}>
                        <div className={'image-cropper-preview-image'}>
                            <img src={croppedImage.preview} alt="crop preview" />
                        </div>
                        <div className={'image-cropper-preview-info'}>
                            <strong>Preview</strong>
                            <br />
                            {croppedImage.width} x {croppedImage.height} ({formatBytes(croppedImage.file.size)})
                        </div>
                    </div>
                )}

                <div className="flex-spacer" />

                <div className={'image-cropper-actions'}>
                    <Button onClick={handleCancel} disabled={cropping}>
                        Cancel
                    </Button>
                    <ButtonPrimary onClick={handleSave} disabled={cropping}>
                        Save
                    </ButtonPrimary>
                </div>
            </div>
        </Modal>
    );
};
