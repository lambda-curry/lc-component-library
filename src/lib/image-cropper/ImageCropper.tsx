// Vendors
import React, { FC, useState, useEffect } from 'react';
import ReactCrop, { Crop } from 'react-image-crop';

// Components
import { Modal } from '../modal/Modal';
import { ModalHeader } from '../modal/ModalHeader';
import { Button } from '../buttons/Button';
import { ButtonPrimary } from '../buttons/ButtonPrimary';

// Helpers
import { formatBytes } from '../file-uploader/FileUploader.helpers';
import { getCroppedImage } from './ImageCropper.helpers';

// Styles
import 'react-image-crop/dist/ReactCrop.css';
import './image-cropper.css';

// Types
import { ImageCropperProps, CroppedImage } from './ImageCropper.types';
import classNames from 'classnames';

export const ImageCropper: FC<ImageCropperProps> = ({
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
  ruleOfThirds = true,
  modalTitle = 'Crop your image',
  className,
  ...props
}) => {
  const initialCrop = {
    unit: '%' as Crop['unit'],
    width: 100,
    height: 100,
    y: 0,
    x: 0,
    ...props.initialCrop
  };

  const [crop, setCrop] = useState<Crop>(initialCrop);
  const [open, setOpen] = useState(!!isOpen);
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);
  const [croppedImage, setCroppedImage] = useState<CroppedImage | null>(null);
  const [cropping, setCropping] = useState(false);

  const cropSrc = file ? file.preview : src;
  const isPercent = initialCrop.unit === '%';
  const aspectRatio = initialCrop.aspect;

  useEffect(() => {
    setOpen(!!isOpen);
  }, [isOpen]);

  // TODO: We don't always want this to happen. So we probably want to add some way to control this outside the component
  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      if (croppedImage) URL.revokeObjectURL(croppedImage.preview);
    },
    []
  );

  function getComputedCrop(newCrop: Crop, newPercentCrop?: Crop) {
    return isPercent && newPercentCrop
      ? { ...newPercentCrop, aspect: aspectRatio }
      : { ...newCrop, aspect: aspectRatio };
  }

  const makeClientCrop = async (newCrop: Crop, imageRefOverride?: HTMLImageElement): Promise<CroppedImage | null> => {
    let newCroppedImage = null;
    const newImageRef = imageRefOverride || imageRef;

    if (!newImageRef) return newCroppedImage;

    setCropping(true);

    if (newImageRef && crop.width && crop.height) {
      newCroppedImage = await getCroppedImage({
        image: newImageRef,
        crop: getComputedCrop(newCrop),
        fileName,
        mimeType
      });

      setCroppedImage(newCroppedImage);
    }

    setCropping(false);

    return newCroppedImage;
  };

  const handleAfterOpen = async () => {
    if (onAfterOpen) onAfterOpen();
  };

  const handleAfterClose = () => {
    setCrop(initialCrop);

    if (onAfterClose) onAfterClose();
  };

  const handleCropChange = (newCrop: Crop, newPercentCrop: Crop) => {
    setCrop(getComputedCrop(newCrop, newPercentCrop));
  };

  const handleCropComplete = async (newCrop: Crop, newPercentCrop: Crop) => {
    await makeClientCrop(getComputedCrop(newCrop, newPercentCrop));
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

    if (onCancel) onCancel();
  };

  const handleSave = async () => {
    let newCroppedImage = croppedImage;

    newCroppedImage = await makeClientCrop(crop);

    setOpen(false);
    cleanup();

    if (onSave) onSave(newCroppedImage);
  };

  if (!cropSrc) return null;

  return (
    <Modal
      className={classNames('lc-image-cropper-modal', className)}
      isOpen={open}
      onAfterOpen={handleAfterOpen}
      onAfterClose={handleAfterClose}
      closeButton={false}
    >
      <ModalHeader className="lc-image-cropper-header" title={modalTitle} />

      <div className="lc-image-cropper-cropper">
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

      <div className="lc-image-cropper-footer">
        {croppedImage && croppedImage.preview && (
          <div className="lc-image-cropper-preview">
            <div className="lc-image-cropper-preview-image">
              <img src={croppedImage.preview} alt="crop preview" />
            </div>
            <div className="lc-image-cropper-preview-info">
              <strong>Preview</strong>
              <br />
              {croppedImage.width} x {croppedImage.height} ({formatBytes(croppedImage.file.size)})
            </div>
          </div>
        )}

        <div className="lc-flex-1" />

        <div className="lc-image-cropper-actions">
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
