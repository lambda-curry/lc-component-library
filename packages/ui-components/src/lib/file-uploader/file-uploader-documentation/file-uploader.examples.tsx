import React from 'react';
import { Form } from '../../form/Form';
import { FileUploader } from '../FileUploader';
import { FileUploaderWithImageCropper } from '../FileUploaderWithImageCropper';

export const FileUploaderExample = () => (
  <Form initialValues={{ fileUploaderExample: [] }} onSubmit={() => {}}>
    {formikProps => <FileUploader name="fileUploaderExample" formikProps={formikProps} />}
  </Form>
);

export const FileUploaderExampleString = `
  <Form initialValues={{ fileUploaderExample: [] }} onSubmit={() => {}}>
    {formikProps => <FileUploader name="fileUploaderExample" formikProps={formikProps} />}
  </Form>`;

export const FileUploaderMultipleExample = () => (
  <Form initialValues={{ fileUploaderMultipleExample: [] }} onSubmit={() => {}}>
    {formikProps => <FileUploader name="fileUploaderMultipleExample" formikProps={formikProps} multiple={true} />}
  </Form>
);

export const FileUploaderMultipleExampleString = `
  <Form initialValues={{ fileUploaderMultipleExample: [] }} onSubmit={() => {}}>
    {formikProps => <FileUploader name="fileUploaderMultipleExample" formikProps={formikProps} multiple={true} />}
  </Form>`;

export const FileUploaderWithImageCropperExample = () => (
  <Form initialValues={{ fileUploaderWithImageCropperExample: [] }} onSubmit={() => {}}>
    {formikProps => (
      <FileUploaderWithImageCropper name="fileUploaderWithImageCropperExample" formikProps={formikProps} />
    )}
  </Form>
);

export const FileUploaderWithImageCropperExampleString = `
  <Form initialValues={{ fileUploaderWithImageCropperExample: [] }} onSubmit={() => {}}>
    {formikProps => (
      <FileUploaderWithImageCropper name="fileUploaderWithImageCropperExample" formikProps={formikProps} />
    )}
  </Form>`;
