import React from 'react';
import Detail from './Detail';
import { type GalleryItem, type GalleryDetailProps } from '@/types/components';

const GalleryDetail: React.FC<GalleryDetailProps> = ({ type, ...props }) => {
  return <Detail<GalleryItem> {...props} showDate={type !== 'gallery'} />;
};

export default GalleryDetail;
