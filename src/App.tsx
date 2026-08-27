import { useMemo, useState, useEffect, useRef, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
// Layout
import MemberLayout from '@/routes/MemberLayout';
import AdminLayout from '@/routes/AdminLayout';
// Context
import { AuthProvider } from '@/contexts/AuthContext';
import { ToastProvider } from '@/components/ui/toast';
import { Header, Footer } from '@/components/layout';
// Components
import { Hero } from '@/components/main';
import { Main, Journey } from '@/pages/member';
import HeaderImg from '@/assets/header.png';

// Lazy load pages for code splitting
const Combination = lazy(() => import('@/pages/member/Combination'));
const Business = lazy(() => import('@/pages/member/Business'));
const Cafe27b = lazy(() => import('@/pages/member/Cafe27b'));
const News = lazy(() => import('@/pages/member/News'));
const Participate = lazy(() => import('@/pages/member/Participate'));
const Contact = lazy(() => import('@/pages/member/Contact'));

// Lazy load admin pages
const AdminLogin = lazy(() => import('@/pages/admin/Login'));
const AdminDashboard = lazy(() => import('@/pages/admin/Dashboard'));
const CreatePost = lazy(() => import('@/pages/admin/CreatePost'));
const EditPost = lazy(() => import('@/pages/admin/EditPost'));
const AdminHistory = lazy(() => import('@/pages/admin/AdminHistory'));

// Loading component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
  </div>
);

const HERO_BY_ROUTE: Record<
  string,
  { src: string; title: string; subtitle?: string; heightVh?: number }
> = {
  '/': {
    src: HeaderImg,
    title: '화전의 전환, 도시 그 이상의 가능성',
    subtitle: '변화의 궤도 위에 선 플랫폼 도시, 화전',
    heightVh: 56,
  },
  '/member/combination': {
    src: HeaderImg,
    title: '기업 소개',
    subtitle: '우리가 함께 만드는 지역의 힘',
    heightVh: 56,
  },
  '/member/business': {
    src: HeaderImg,
    title: '사업 안내',
    subtitle: '마을과 함께 성장하는 비즈니스',
    heightVh: 56,
  },
  '/member/cafe27b': {
    src: HeaderImg,
    title: '카페 27b',
    subtitle: '화전마을의 특별한 복합문화 공간',
    heightVh: 56,
  },
  '/member/news': {
    src: HeaderImg,
    title: '소식과 자료',
    subtitle: '최신 이야기와 아카이브',
    heightVh: 56,
  },
  '/member/participate': {
    src: HeaderImg,
    title: '참여하기',
    subtitle: '작은 참여가 큰 변화를 만듭니다',
    heightVh: 56,
  },
  '/member/contact': {
    src: HeaderImg,
    title: '문의하기',
    subtitle: '무엇이든 편하게 물어보세요',
    heightVh: 56,
  },
};

type SeoMeta = {
  title: string;
  description: string;
  keywords: string;
};

const BASE_URL = 'https://hi27b.com';
const DEFAULT_KEYWORDS =
  '화전마을관리사회적협동조합, 마을관리사회적협동조합, 마을기업, 도시재생, 지역활성화, 도시재생사업, 사회적협동조합, 주민참여, 화전, 화전마을';

const SEO_BY_ROUTE: Record<string, SeoMeta> = {
  '/': {
    title: '화전마을관리사회적협동조합',
    description:
      '화전마을관리사회적협동조합 공식 홈페이지. 마을기업·도시재생 소식과 참여 안내.',
    keywords: DEFAULT_KEYWORDS,
  },
  '/member/combination': {
    title: '기업 소개 | 화전마을관리사회적협동조합',
    description:
      '화전마을관리사회적협동조합의 비전, 미션, 조직 소개를 확인하세요. 마을기업과 도시재생의 가치를 바탕으로 지역과 함께 성장합니다.',
    keywords: `${DEFAULT_KEYWORDS}, 기업소개, 조합소개, 미션비전`,
  },
  '/member/business': {
    title: '사업 안내 | 화전마을관리사회적협동조합',
    description:
      '마을관리사회적협동조합의 주요 사업 안내. 도시재생, 지역활성화, 주민참여 기반의 다양한 사업을 운영합니다.',
    keywords: `${DEFAULT_KEYWORDS}, 사업안내, 지역사업, 공익사업`,
  },
  '/member/cafe27b': {
    title: '카페 27b | 화전마을관리사회적협동조합',
    description:
      '카페 27b는 화전마을의 복합문화 거점공간입니다. 도시재생과 마을기업 운영 사례를 통해 지역과 연결됩니다.',
    keywords: `${DEFAULT_KEYWORDS}, 카페27b, 복합문화공간, 마을거점`,
  },
  '/member/news': {
    title: '소식과 자료 | 화전마을관리사회적협동조합',
    description:
      '화전마을관리사회적협동조합의 공지, 행사, 보도자료 등 최신 소식과 자료를 확인하세요.',
    keywords: `${DEFAULT_KEYWORDS}, 공지사항, 행사소식, 마을소식`,
  },
  '/member/participate': {
    title: '참여하기 | 화전마을관리사회적협동조합',
    description:
      '후원, 봉사, 프로그램 참여 등 화전마을관리사회적협동조합과 함께하는 다양한 방법을 안내합니다.',
    keywords: `${DEFAULT_KEYWORDS}, 참여하기, 후원, 자원봉사, 조합원`,
  },
  '/member/contact': {
    title: '문의하기 | 화전마을관리사회적협동조합',
    description:
      '화전마을관리사회적협동조합 문의 페이지입니다. 사업 협력, 시설 이용, 일반 문의를 남겨주세요.',
    keywords: `${DEFAULT_KEYWORDS}, 문의하기, 연락처, 협력문의`,
  },
};

const JOURNEY_SEO: SeoMeta = {
  title: '화전 이야기 | 화전마을관리사회적협동조합',
  description:
    '화전의 역사와 변화, 그리고 도시재생의 발자취를 확인하세요. 마을관리사회적협동조합이 만들어가는 지역 이야기입니다.',
  keywords: `${DEFAULT_KEYWORDS}, 화전이야기, 지역역사, 도시재생사례`,
};

function getSeoMeta(route: string): SeoMeta {
  if (route.startsWith('/admin')) {
    return {
      title: '관리자 페이지 | 화전마을관리사회적협동조합',
      description: '관리자 전용 페이지입니다.',
      keywords: 'admin',
    };
  }

  if (route.startsWith('/member/journey/')) return JOURNEY_SEO;
  return SEO_BY_ROUTE[route] ?? SEO_BY_ROUTE['/'];
}

function AppContent() {
  const location = useLocation();
  const route = location.pathname;
  const canonicalUrl = `${BASE_URL}${route}`;
  const seo = getSeoMeta(route);

  // 페이지 이동 시 스크롤을 헤더 아래로 이동
  useEffect(() => {
    // 헤더 높이를 동적으로 계산
    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 80; // 기본값 80px

    // 헤더 아래 위치로 스크롤
    window.scrollTo(0, headerHeight);
  }, [location.pathname, location.search]);

  const heroConf = useMemo(() => {
    // 매칭되는 설정이 없으면 기본값 사용
    return (
      HERO_BY_ROUTE[route] ?? {
        src: HeaderImg,
        title: '화전',
        subtitle: '도시 그 이상의 가능성',
        heightVh: 56,
      }
    );
  }, [route]);

  const [_progress, setProgress] = useState(0); // 0~1
  const heroRef = useRef<HTMLDivElement>(null!);

  // 스크롤 진행도(히어로 페이드/패럴랙스에 사용)
  useEffect(() => {
    const onScroll = () => {
      const el = heroRef.current;
      if (!el) return;
      const h = el.offsetHeight || 1;
      const y = Math.min(Math.max(window.scrollY, 0), h);
      setProgress(y / h); // 0~1
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [route]);

  // 어드민 페이지인지 확인
  const isAdminPage = route.startsWith('/admin');

  return (
    <div>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <link rel="canonical" href={canonicalUrl} />
        {isAdminPage ? (
          <meta name="robots" content="noindex, nofollow, noarchive" />
        ) : (
          <meta name="robots" content="index, follow" />
        )}
      </Helmet>
      {!isAdminPage && (
        <>
          {/* 고정 헤더 */}
          <Header />

          {/* 히어로 */}
          <Hero title={heroConf.title} subtitle={heroConf.subtitle} route={route} />
        </>
      )}

      <main>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Member Routes */}
            <Route path="/" element={<Main />} />
            <Route path="/member" element={<MemberLayout />}>
              <Route path="combination" element={<Combination />} />
              <Route path="journey/:step" element={<Journey />} />
              <Route path="business" element={<Business />} />
              <Route path="cafe27b" element={<Cafe27b />} />
              <Route path="news" element={<News />} />
              <Route path="participate" element={<Participate />} />
              <Route path="contact" element={<Contact />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="create" element={<CreatePost />} />
              <Route path="edit/:id" element={<EditPost />} />
              <Route path="history" element={<AdminHistory />} />
              <Route index element={<AdminDashboard />} />
            </Route>
          </Routes>
        </Suspense>
      </main>

      {/* admin 페이지는 헤더와 푸터를 표시하지 않음 */}
      {!isAdminPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
