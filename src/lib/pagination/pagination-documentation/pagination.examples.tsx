import React, { FC } from 'react';
import {
  Pagination,
  PaginationPrimary,
  PaginationAccent,
  PaginationOutline,
  PaginationOutlinePrimary,
  PaginationOutlineAccent
} from '..';

export const PaginationExamples1: FC = () => (
  <>
    <Pagination pagesCount={10} />
    <br />
    <PaginationPrimary pagesCount={10} />
    <br />
    <PaginationAccent pagesCount={10} />
    <br />
    <PaginationOutline pagesCount={10} />
    <br />
    <PaginationOutlinePrimary pagesCount={10} />
    <br />
    <PaginationOutlineAccent pagesCount={10} />
  </>
);
