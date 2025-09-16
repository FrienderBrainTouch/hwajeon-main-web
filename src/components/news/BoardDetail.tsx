import React from 'react';
import Detail from './Detail';
import { type BoardItem, type BoardDetailProps } from '@/types/components';

const BoardDetail: React.FC<BoardDetailProps> = (props) => {
  return <Detail<BoardItem> {...props} />;
};

export default BoardDetail;
