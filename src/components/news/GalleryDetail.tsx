import React from 'react';
import Detail from './Detail';
import { type GalleryItem } from './data/types';

interface GalleryDetailProps {
  item: GalleryItem;
  onBackToList: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
}

const GalleryDetail: React.FC<GalleryDetailProps> = (props) => {
  return <Detail<GalleryItem> {...props} />;
};

export default GalleryDetail;
