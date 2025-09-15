import React from 'react';
import Detail from './Detail';
import { type GalleryItem } from '@/types/components';

interface GalleryDetailProps {
  item: GalleryItem;
  onBackToList: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
  type?: 'news' | 'gallery'; // 화전 소식은 작성일 표시, 활동 갤러리는 숨김
}

const GalleryDetail: React.FC<GalleryDetailProps> = ({ type, ...props }) => {
  return <Detail<GalleryItem> {...props} showDate={type !== 'gallery'} />;
};

export default GalleryDetail;
