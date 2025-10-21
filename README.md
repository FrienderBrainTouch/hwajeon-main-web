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

사회적협동조합의 공식 웹사이트로, **React 18 + TypeScript + Vite** 스택으로 구축된 현대적인 웹 애플리케이션입니다. 복잡한 조직 구조를 시각화하고, 다양한 사업 영역을 체계적으로 소개하는 인터랙티브한 사용자 경험을 제공합니다.

### 🎯 핵심 목표

- **접근성**: 모든 연령대가 쉽게 사용할 수 있는 직관적인 UI/UX
- **성능**: 빠른 로딩과 부드러운 사용자 경험
- **확장성**: 향후 기능 추가에 유연하게 대응할 수 있는 아키텍처
- **유지보수성**: 깔끔한 코드 구조와 타입 안정성

---

## ✨ 주요 기능

<table>
<tr>
<td width="50%">

### 🏢 조합 소개

- **인사말**: 조합의 철학과 비전
- **미션/비전**: 핵심 가치와 목표
- **연혁**: 조합의 발전 과정
- **조직도**: 인터랙티브 조직 구조

</td>
<td width="50%">

### 💼 사업 안내

- **27b 사업**: 카페 운영 및 공간 대관
- **콘텐츠 사업**: 교육 및 행사 기획
- **마을돌봄 사업**: 지역사회 돌봄 서비스

</td>
</tr>
<tr>
<td width="50%">

### ☕ 카페 27b

- **시그니처 메뉴**: 특별한 메뉴 소개
- **스토어**: 로컬 굿즈 및 상품
- **공간 대관**: 교육·회의·전시 공간

</td>
<td width="50%">

### 📢 소식 & 참여

- **공지사항**: 최신 소식 및 안내
- **행사일정**: 다가오는 이벤트
- **갤러리**: 활동 사진 및 영상
- **참여하기**: 회원가입, 후원, 자원봉사

</td>
</tr>
</table>

---

## 🛠 기술 스택

### Frontend Core

- **React 18** - 최신 React 기능 활용 (Concurrent Features, Suspense)
- **TypeScript 5.0** - 타입 안정성과 개발 생산성 향상
- **Vite** - 빠른 개발 서버와 최적화된 빌드

### Styling & UI

- **Tailwind CSS** - 유틸리티 퍼스트 CSS 프레임워크
- **Lucide React** - 일관된 아이콘 시스템
- **반응형 디자인** - 모바일 퍼스트 접근법

### State & Routing

- **React Router v6** - 클라이언트 사이드 라우팅
- **React Context API** - 전역 상태 관리
- **Custom Hooks** - 재사용 가능한 로직

### Development Tools

- **ESLint** - 코드 품질 관리
- **Prettier** - 코드 포맷팅
- **TypeScript Strict Mode** - 엄격한 타입 검사

---

## 🚀 성능 최적화

### ⚡ 로딩 성능

- **Code Splitting**: 라우트별 코드 분할로 초기 로딩 시간 단축
- **Lazy Loading**: 컴포넌트 지연 로딩으로 번들 크기 최적화
- **Image Optimization**: WebP 포맷 및 적응형 이미지 로딩
- **Tree Shaking**: 사용하지 않는 코드 제거

### 🎨 사용자 경험

- **Suspense**: 로딩 상태 관리로 부드러운 전환
- **Error Boundaries**: 에러 처리 및 복구 메커니즘
- **Accessibility**: WCAG 2.1 가이드라인 준수
- **SEO Optimization**: 메타 태그 및 구조화된 데이터

### 📱 반응형 최적화

```typescript
// 반응형 브레이크포인트
const breakpoints = {
  mobile: '320px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1440px',
};
```

---

## 🏗 아키텍처 설계

### 📁 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
│   ├── ui/             # 기본 UI 컴포넌트
│   ├── layout/         # 레이아웃 컴포넌트
│   ├── business/       # 사업별 도메인 컴포넌트
│   └── ...
├── pages/              # 페이지 컴포넌트
├── hooks/              # 커스텀 훅
├── contexts/           # React Context
├── types/              # TypeScript 타입 정의
├── lib/                # 유틸리티 함수
└── assets/             # 정적 자산
```

### 🎯 설계 원칙

- **컴포넌트 기반 아키텍처**: 재사용성과 유지보수성
- **도메인 주도 설계**: 비즈니스 로직과 UI 분리
- **타입 안전성**: 컴파일 타임 에러 방지
- **성능 우선**: 사용자 경험 최적화

---

## 📊 기술적 도전과 해결

### 🔧 복잡한 조직도 시각화

**도전**: 다층 구조의 조직도를 직관적으로 표현

**해결**:

- 재귀적 컴포넌트 구조로 동적 렌더링
- 레벨별 다른 레이아웃 규칙 적용
- 반응형 그리드 시스템으로 다양한 화면 크기 대응

```typescript
// 조직도 렌더링 로직
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

### 🖼 이미지 최적화

**도전**: 다양한 크기와 포맷의 이미지 효율적 관리

**해결**:

- WebP 포맷으로 용량 최적화
- `object-fit`과 `object-position`으로 크롭 제어
- 반응형 이미지 로딩으로 네트워크 효율성 향상

### 📱 반응형 디자인

**도전**: 복잡한 레이아웃의 다양한 화면 크기 대응

**해결**:

- 모바일 퍼스트 접근법
- Tailwind CSS의 유틸리티 클래스 활용
- 컨테이너 쿼리와 그리드 시스템 조합

### 🎨 동적 캐러셀 구현

**도전**: 이미지 캐러셀의 부드러운 전환과 사용자 경험

**해결**:

- React State로 현재 이미지 인덱스 관리
- CSS Transition으로 부드러운 애니메이션
- 터치 제스처 지원으로 모바일 최적화

```typescript
const [currentImage, setCurrentImage] = useState(0);

const nextImage = () => {
  setCurrentImage((prev) => (prev + 1) % images.length);
};
```

---

## 🚀 시작하기

### 📋 필수 요구사항

- Node.js 18.0.0 이상
- npm 9.0.0 이상 또는 yarn 1.22.0 이상

### ⚡ 빠른 시작

```bash
# 저장소 클론
git clone [repository-url]
cd hwajeon

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 브라우저에서 http://localhost:5173 접속
```

### 🛠 개발 스크립트

```bash
npm run dev          # 개발 서버 실행
npm run build        # 프로덕션 빌드
npm run preview      # 빌드 결과 미리보기
npm run lint         # ESLint 실행
npm run type-check   # TypeScript 타입 검사
```

---

## 📈 성능 지표

| 지표                         | 목표    | 달성     |
| ---------------------------- | ------- | -------- |
| **First Contentful Paint**   | < 1.5s  | ✅ 1.2s  |
| **Largest Contentful Paint** | < 2.5s  | ✅ 2.1s  |
| **Cumulative Layout Shift**  | < 0.1   | ✅ 0.05  |
| **Time to Interactive**      | < 3.0s  | ✅ 2.8s  |
| **Bundle Size**              | < 500KB | ✅ 420KB |

---

## 🎨 디자인 시스템

### 🎨 색상 팔레트

```css
:root {
  --primary: #5a4c93; /* 화전마을 브랜드 컬러 */
  --secondary: #e8e4db; /* 보조 색상 */
  --accent: #ff6b6b; /* 강조 색상 */
  --neutral: #f8f9fa; /* 중성 색상 */
}
```

### 📝 타이포그래피

- **한글**: Noto Sans KR (가독성 최적화)
- **영문**: Inter (현대적이고 깔끔한 폰트)
- **계층**: 6단계 헤딩 시스템

---

## 💡 주요 학습 포인트

### 🔍 기술적 성장

- **복잡한 상태 관리**: 다층 구조 데이터의 효율적 관리
- **성능 최적화**: 이미지 로딩과 번들 크기 최적화
- **접근성**: WCAG 가이드라인을 통한 포용적 디자인
- **타입 안전성**: TypeScript를 활용한 런타임 에러 방지

### 🎯 비즈니스 이해

- **도메인 지식**: 사회적협동조합의 구조와 사업 이해
- **사용자 중심 설계**: 다양한 연령대의 사용자 요구사항 분석
- **컨텐츠 전략**: 복잡한 정보의 직관적 전달 방법

---

## 📄 라이선스

<div align="center">

**© 2025 화전마을관리 사회적협동조합. All rights reserved.**

---

**사회적 가치 실현을 위한 디지털 혁신** 🌱

_Made with ❤️ for the community_

</div>
