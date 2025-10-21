# 화전마을관리 사회적협동조합 웹사이트

화전마을관리 사회적협동조합의 공식 웹사이트입니다. React + TypeScript + Vite로 구축되었습니다.

## 🏢 프로젝트 소개

화전마을관리 사회적협동조합은 도시재생을 통한 마을공동체 활성화를 목표로 하는 사회적협동조합입니다. 이 웹사이트는 조합의 사업 소개, 소식, 참여 방법 등을 제공합니다.

### 주요 기능

- **조합 소개**: 인사말, 미션/비전, 연혁, 조직도
- **사업 안내**: 27b 사업, 콘텐츠 사업, 마을돌봄 사업
- **카페 27b**: 특별한 복합문화 공간 소개
- **소식**: 공지사항, 행사일정, 갤러리
- **참여하기**: 회원가입, 후원, 자원봉사 신청
- **연락처**: 문의하기, 오시는길, SNS 안내

## 🛠 기술 스택

- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router
- **State Management**: React Context API

## 📁 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
│   ├── admin/          # 관리자 페이지 컴포넌트
│   ├── auth/           # 인증 관련 컴포넌트
│   ├── business/       # 사업 안내 컴포넌트
│   ├── combination/    # 조합 소개 컴포넌트
│   ├── contact/        # 연락처 컴포넌트
│   ├── layout/         # 레이아웃 컴포넌트
│   ├── main/           # 메인 페이지 컴포넌트
│   ├── news/           # 소식 컴포넌트
│   ├── participate/    # 참여하기 컴포넌트
│   └── ui/             # UI 컴포넌트
├── pages/              # 페이지 컴포넌트
├── types/              # TypeScript 타입 정의
├── hooks/              # 커스텀 훅
├── contexts/           # React Context
├── lib/                # 유틸리티 함수
└── assets/             # 정적 자산
```

## 🚀 시작하기

### 필수 요구사항

- Node.js 18.0.0 이상
- npm 또는 yarn

### 설치 및 실행

1. 저장소 클론

```bash
git clone [repository-url]
cd hwajeon
```

2. 의존성 설치

```bash
npm install
```

3. 개발 서버 실행

```bash
npm run dev
```

4. 브라우저에서 `http://localhost:5173` 접속

### 빌드

```bash
npm run build
```

### 미리보기

```bash
npm run preview
```

## 📱 반응형 디자인

- **모바일**: 320px 이상
- **태블릿**: 768px 이상
- **데스크톱**: 1024px 이상

## 🎨 디자인 시스템

- **색상**: 화전마을의 브랜드 컬러를 기반으로 한 색상 팔레트
- **타이포그래피**: 한글과 영문에 최적화된 폰트 시스템
- **컴포넌트**: 재사용 가능한 UI 컴포넌트 라이브러리

## 📞 연락처

- **주소**: 경기도 고양시 덕양구 화랑로57-27 고양드론앵커센터 1층
- **대표번호**: 02-3158-3001
- **이메일**: hwajeoncoop@naver.com

### SNS

- **페이스북**: [@hwajeon3001](https://www.facebook.com/hwajeon3001)
- **인스타그램**: [@hwajeon3001](https://www.instagram.com/hwajeon3001)
- **유튜브**: [@hjcoop](https://www.youtube.com/@hjcoop)

## 📄 라이선스

© 2025 화전마을관리 사회적협동조합. All rights reserved.

---

**화전마을관리 사회적협동조합**  
사람과 마을이 함께 피어나는 곳, 화전
