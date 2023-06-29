import React, { useEffect, useState } from 'react';
import { Crop } from 'react-image-crop';
import { ButtonUnstyled } from '../../buttons/ButtonUnstyled';
import { FileUpload } from '../../file-uploader/FileUploader.types';
import { ImageCropper } from '../ImageCropper';
import { fetchFileFromURL } from '../ImageCropper.helpers';
import { CroppedImage } from '../ImageCropper.types';
import { Button } from '../../buttons';

export const ImageCropperExample = () => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<FileUpload | null | undefined>(null);
  const [croppedImage, setCroppedImage] = useState<CroppedImage | null>(null);

  const fetchImage = async () => {
    const imageURL = 'https://picsum.photos/800/600';
    const imageFile = await fetchFileFromURL(imageURL);
    const preview = URL.createObjectURL(imageFile);

    setFile({ ...imageFile, preview, lastModified: 0, name: '' });
  };

  useEffect(() => {
    fetchImage();
  }, []);

  const handleImageClick = async () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = (newCroppedImage: CroppedImage | null) => {
    setCroppedImage(newCroppedImage);
  };

  const handleReset = () => {
    setCroppedImage(null);
  };

  if (!file) return <>Loading image...</>;

  return (
    <>
      <ImageCropper
        file={croppedImage ? { ...croppedImage.file, preview: croppedImage.preview } : file}
        isOpen={open}
        onSave={handleSave}
        onAfterClose={handleClose}
      />

      <ButtonUnstyled onClick={handleImageClick} className="!lc-inline-block lc-max-w-100 lc-p-0">
        <img src={croppedImage ? croppedImage.preview : file.preview} className="lc-block lc-max-w-100" />
      </ButtonUnstyled>

      {croppedImage && (
        <div className="lc-mt-16" onClick={handleReset}>
          <Button>Reset</Button>
        </div>
      )}
    </>
  );
};

export const ImageCropperExampleString = `
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<FileUpload | undefined | null>(null);
  const [croppedImage, setCroppedImage] = useState<CroppedImage | null>(null);

  const fetchImage = async () => {
    const imageURL = 'https://picsum.photos/800/600';
    const imageFile = await fetchFileFromURL(imageURL);
    const preview = URL.createObjectURL(imageFile);

    setFile({ ...imageFile, preview, lastModified: 0, name: '' });
  };

  useEffect(() => {
    fetchImage();
  }, []);

  const handleImageClick = async () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = (newCroppedImage: CroppedImage | null) => {
    if (newCroppedImage) setCroppedImage(newCroppedImage);
  };

  if (!file) return <>Loading...</>;

  return (
    <>
      <ImageCropper
        file={croppedImage ? { ...croppedImage.file, preview: croppedImage.preview } : file}
        isOpen={open}
        onSave={handleSave}
        onAfterClose={handleClose}
      />
      <ButtonUnstyled onClick={handleImageClick}>
        <img src={croppedImage ? croppedImage.preview : file.preview} />
      </ButtonUnstyled>
    </>
  );`;
