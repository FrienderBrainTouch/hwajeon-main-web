import React from 'react';
import Detail from './Detail';
import { type BoardItem } from '@/types/components';

interface BoardDetailProps {
  item: BoardItem;
  onBackToList: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
}

const BoardDetail: React.FC<BoardDetailProps> = (props) => {
  return <Detail<BoardItem> {...props} />;
};

export default BoardDetail;
