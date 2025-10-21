<div align="center">

# 🏘️ 화전마을관리 사회적협동조합 웹사이트

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.0.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

**사회적협동조합 웹사이트 개발 프로젝트**

</div>

---

## 📋 프로젝트 개요

사회적협동조합의 공식 웹사이트로, **React 18 + TypeScript + Vite** 스택으로 구축된 웹 애플리케이션입니다. 복잡한 조직 구조를 시각화하고, 다양한 사업 영역을 체계적으로 소개하는 사용자 경험을 제공합니다.

### 🎯 주요 목표

- **접근성**: 직관적인 UI/UX 설계
- **반응형**: 모바일부터 데스크톱까지 대응
- **유지보수성**: 깔끔한 코드 구조와 타입 안정성

---

## ✨ 구현된 기능

### 🏢 조합 소개

- **인사말**: 조합의 철학과 비전
- **미션/비전**: 핵심 가치와 목표
- **연혁**: 조합의 발전 과정
- **조직도**: 인터랙티브 조직 구조 시각화

### 💼 사업 안내

- **27b 사업**: 카페 운영 및 공간 대관
- **콘텐츠 사업**: 교육 및 행사 기획
- **마을돌봄 사업**: 지역사회 돌봄 서비스

### ☕ 카페 27b

- **시그니처 메뉴**: 이미지 갤러리
- **스토어**: 로컬 굿즈 및 상품 소개
- **공간 대관**: 교육·회의·전시 공간 안내

### 📢 소식 & 참여

- **공지사항**: 최신 소식 및 안내
- **행사일정**: 다가오는 이벤트
- **갤러리**: 활동 사진 및 영상
- **참여하기**: 회원가입, 후원, 자원봉사 신청

---

## 🛠 사용 기술

- **React 18** - 컴포넌트 기반 UI 개발
- **TypeScript** - 타입 안정성 확보
- **Vite** - 빠른 개발 환경
- **Tailwind CSS** - 유틸리티 퍼스트 스타일링
- **React Router** - 클라이언트 사이드 라우팅
- **Lucide React** - 아이콘 시스템

---

## 🏗 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
│   ├── ui/             # 기본 UI 컴포넌트
│   ├── layout/         # 레이아웃 컴포넌트
│   ├── business/       # 사업별 도메인 컴포넌트
│   ├── combination/    # 조합 소개 컴포넌트
│   ├── contact/        # 연락처 컴포넌트
│   ├── news/           # 소식 컴포넌트
│   └── participate/    # 참여하기 컴포넌트
├── pages/              # 페이지 컴포넌트
├── hooks/              # 커스텀 훅
├── contexts/           # React Context
├── types/              # TypeScript 타입 정의
├── lib/                # 유틸리티 함수
└── assets/             # 정적 자산
```

---

## 🔧 주요 구현 내용

### 복잡한 조직도 시각화

- **재귀적 컴포넌트 구조**로 동적 렌더링
- **레벨별 다른 레이아웃 규칙** 적용
- **반응형 그리드 시스템**으로 다양한 화면 크기 대응

```typescript
const renderLevel = (level: number, nodes: TreeNode[]) => {
  switch (level) {
    case 0:
      return renderSingleNode(nodes[0]);
    case 1:
      return renderHorizontalGroup(nodes);
    case 2:
      return renderVerticalGroup(nodes);
    case 3:
      return renderBusinessDepartments(nodes);
  }
};
```

### 이미지 최적화

- **WebP 포맷**으로 용량 최적화
- **object-fit과 object-position**으로 크롭 제어
- **반응형 이미지 로딩**으로 네트워크 효율성 향상

### 동적 캐러셀 구현

- **React State**로 현재 이미지 인덱스 관리
- **CSS Transition**으로 부드러운 애니메이션
- **터치 제스처 지원**으로 모바일 최적화

```typescript
const [currentImage, setCurrentImage] = useState(0);

const nextImage = () => {
  setCurrentImage((prev) => (prev + 1) % images.length);
};
```

### 반응형 디자인

- **모바일 퍼스트** 접근법
- **Tailwind CSS**의 유틸리티 클래스 활용
- **컨테이너 쿼리**와 그리드 시스템 조합

---

## 🚀 개발 환경

### 필수 요구사항

- Node.js 18.0.0 이상
- npm 9.0.0 이상

### 실행 방법

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
```

---

## 💡 개발 과정에서의 학습

### 기술적 성장

- **복잡한 상태 관리**: 다층 구조 데이터의 효율적 관리
- **타입 안전성**: TypeScript를 활용한 런타임 에러 방지
- **컴포넌트 설계**: 재사용 가능한 컴포넌트 아키텍처

### 비즈니스 이해

- **도메인 지식**: 사회적협동조합의 구조와 사업 이해
- **사용자 중심 설계**: 다양한 연령대의 사용자 요구사항 분석
- **컨텐츠 전략**: 복잡한 정보의 직관적 전달 방법

---

## 📄 라이선스

<div align="center">

**© 2025 화전마을관리 사회적협동조합. All rights reserved.**

---

**사회적 가치 실현을 위한 디지털 혁신** 🌱

</div>
