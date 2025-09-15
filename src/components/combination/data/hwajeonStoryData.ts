import type { Card, StoryImage } from '@/types/components/combination';

export const cards: Card[] = [
  {
    id: 1,
    type: 'gradient',
    title: '화전의 정체성',
    description: '화전만의 독특한 정체성과 가치',
    gradient: 'from-blue-500 to-purple-600',
  },
  {
    id: 2,
    type: 'gray',
    title: '지역 공동체',
    description: '함께 만들어가는 지역 공동체',
  },
  {
    id: 3,
    type: 'image',
    title: '협동조합',
    description: '상생과 협동의 가치',
    image: '/images/story/coop.jpg',
  },
  {
    id: 4,
    type: 'gradient',
    title: '지속가능성',
    description: '지속가능한 발전과 미래',
    gradient: 'from-green-500 to-blue-600',
  },
  {
    id: 5,
    type: 'gray',
    title: '혁신',
    description: '새로운 도전과 혁신',
  },
  {
    id: 6,
    type: 'image',
    title: '희망',
    description: '더 나은 미래를 향한 희망',
    image: '/images/story/hope.jpg',
  },
];

export const storyImages: StoryImage[] = [
  {
    id: 1,
    src: '/images/story/image1.jpg',
    alt: '화전 마을의 모습',
  },
  {
    id: 2,
    src: '/images/story/image2.jpg',
    alt: '지역 주민들의 활동',
  },
];

export const mainStoryImage = {
  src: '/images/story/main.jpg',
  alt: '화전 마을의 변화와 흐름',
};
