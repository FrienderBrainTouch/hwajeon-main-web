export interface MainImage {
  id: number;
  name: string;
  src: string;
  alt: string;
}

export interface MenuItem {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
}

export interface ProductItem {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
}

export interface CateringService {
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface MobileCafeService {
  id: number;
  title: string;
  description: string;
  image: string;
  isTextCard?: boolean;
}

export const mainImages: MainImage[] = [
  {
    id: 1,
    name: '이미지1',
    src: '/images/cafe/main1.jpg',
    alt: '카페27b 메인 이미지 1',
  },
  {
    id: 2,
    name: '이미지2',
    src: '/images/cafe/main2.jpg',
    alt: '카페27b 메인 이미지 2',
  },
  {
    id: 3,
    name: '이미지3',
    src: '/images/cafe/main3.jpg',
    alt: '카페27b 메인 이미지 3',
  },
];

export const menuItems: MenuItem[] = [
  {
    id: 1,
    name: '아메리카노',
    price: '4,500원',
    description: '깔끔하고 진한 에스프레소',
    image: '/images/cafe/menu/americano.jpg',
  },
  {
    id: 2,
    name: '라떼',
    price: '5,000원',
    description: '부드러운 우유와 에스프레소의 조화',
    image: '/images/cafe/menu/latte.jpg',
  },
  {
    id: 3,
    name: '카푸치노',
    price: '5,000원',
    description: '진한 에스프레소와 거품의 완벽한 조화',
    image: '/images/cafe/menu/cappuccino.jpg',
  },
  {
    id: 4,
    name: '모카',
    price: '5,500원',
    description: '초콜릿과 에스프레소의 달콤한 만남',
    image: '/images/cafe/menu/mocha.jpg',
  },
  {
    id: 5,
    name: '에스프레소',
    price: '3,500원',
    description: '진한 에스프레소의 원맛',
    image: '/images/cafe/menu/espresso.jpg',
  },
  {
    id: 6,
    name: '바닐라라떼',
    price: '5,500원',
    description: '바닐라 시럽이 들어간 달콤한 라떼',
    image: '/images/cafe/menu/vanilla-latte.jpg',
  },
];

export const productItems: ProductItem[] = [
  {
    id: 1,
    name: '원두',
    price: '15,000원',
    description: '프리미엄 원두 200g',
    image: '/images/cafe/products/beans1.jpg',
  },
  {
    id: 2,
    name: '텀블러',
    price: '25,000원',
    description: '스테인리스 텀블러 500ml',
    image: '/images/cafe/products/tumbler1.jpg',
  },
  {
    id: 3,
    name: '머그컵',
    price: '18,000원',
    description: '세라믹 머그컵 세트',
    image: '/images/cafe/products/mug1.jpg',
  },
  {
    id: 4,
    name: '드립백',
    price: '8,000원',
    description: '원두 드립백 10개입',
    image: '/images/cafe/products/dripbag1.jpg',
  },
  {
    id: 5,
    name: '시럽',
    price: '12,000원',
    description: '바닐라 시럽 500ml',
    image: '/images/cafe/products/syrup1.jpg',
  },
  {
    id: 6,
    name: '쿠키',
    price: '6,000원',
    description: '수제 쿠키 6개입',
    image: '/images/cafe/products/cookie1.jpg',
  },
];

export const cateringServices: CateringService[] = [
  {
    id: 1,
    title: '기업 행사',
    description: '회의, 세미나, 워크샵 등 기업 행사 케이터링',
    image: '/images/cafe/catering/corporate.jpg',
  },
  {
    id: 2,
    title: '결혼식',
    description: '소규모 결혼식 및 리셉션 케이터링',
    image: '/images/cafe/catering/wedding.jpg',
  },
  {
    id: 3,
    title: '생일파티',
    description: '가족, 친구들과의 특별한 순간을 위한 케이터링',
    image: '/images/cafe/catering/birthday.jpg',
  },
  {
    id: 4,
    title: '기타 행사',
    description: '다양한 특별한 순간을 위한 맞춤형 케이터링',
    image: '/images/cafe/catering/other.jpg',
  },
];

export const mobileCafeServices: MobileCafeService[] = [
  {
    id: 1,
    title: '이동카페 서비스',
    description: '원하는 장소로 찾아가는 이동카페 서비스',
    image: '/images/cafe/mobile/mobile1.jpg',
  },
  {
    id: 2,
    title: '이벤트 카페',
    description: '축제, 행사장에서 운영하는 특별한 카페',
    image: '/images/cafe/mobile/mobile2.jpg',
  },
  {
    id: 3,
    title: '야외 카페',
    description: '공원, 해변 등 야외에서 즐기는 카페 경험',
    image: '/images/cafe/mobile/mobile3.jpg',
  },
  {
    id: 4,
    title: '이동카페 서비스 안내',
    description:
      '이동카페 서비스는 최소 2시간부터 예약 가능하며, 다양한 메뉴와 장비를 제공합니다. 행사 규모와 요구사항에 맞춰 맞춤형 서비스를 제공해드립니다.',
    image: '',
    isTextCard: true,
  },
];
