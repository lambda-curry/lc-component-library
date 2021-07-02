import { Http2ServerRequest } from 'http2';
import React, { useEffect, useState } from 'react';
import { ButtonUnstyled } from '../../buttons/ButtonUnstyled';
import { FileUpload } from '../../file-uploader/FileUploader.types';
import { ImageCropper } from '../ImageCropper';
import { fetchFileFromURL } from '../ImageCropper.helpers';
import { CroppedImage } from '../ImageCropper.types';

export const ImageCropperExample = () => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<FileUpload | undefined | null>(null);
  const [croppedImage, setCroppedImage] = useState<CroppedImage | null>(null);

  const fetchImage = async () => {
    const imageURL = 'https://source.unsplash.com/random/800x600';
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
  );
};

export const ImageCropperExampleString = `
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<FileUpload | undefined | null>(null);
  const [croppedImage, setCroppedImage] = useState<CroppedImage | null>(null);

  const fetchImage = async () => {
    const imageURL = 'https://source.unsplash.com/random/800x600';
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
