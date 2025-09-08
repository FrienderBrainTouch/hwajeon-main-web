import { useMemo, useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
// Layout
import MemberLayout from './routes/MemberLayout';
import AdminLayout from './routes/AdminLayout';
// Context
import { AuthProvider } from '@/contexts/AuthContext';
import { ToastProvider } from '@/components/ui/toast';
import { Header, Footer } from '@/components/layout';
// Components
import { Hero } from '@/components/main';
import { Main, Combination, Business, News, Participate, Contact } from './pages/member';
import { AdminLogin, AdminDashboard, UserManagement, AdminSettings } from './pages/admin';
import HeaderImg from '@/assets/header.png';

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
    title: '조합 소개',
    subtitle: '우리가 함께 만드는 지역의 힘',
    heightVh: 56,
  },
  '/member/business': {
    src: HeaderImg,
    title: '사업 안내',
    subtitle: '마을과 함께 성장하는 비즈니스',
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

function AppContent() {
  const location = useLocation();
  const route = location.pathname;

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

  const [progress, setProgress] = useState(0); // 0~1
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
      {!isAdminPage && (
        <>
          {/* 고정 헤더 */}
          <Header />

          {/* 히어로 (일반 페이지만) */}
          <Hero
            refEl={heroRef}
            src={HeaderImg}
            title={heroConf.title}
            subtitle={heroConf.subtitle}
            heightVh={heroConf.heightVh ?? 40}
            progress={progress}
          />
        </>
      )}

      <main>
        <Routes>
          {/* Member Routes */}
          <Route path="/" element={<Main />} />
          <Route path="/member" element={<MemberLayout />}>
            <Route path="combination" element={<Combination />} />
            <Route path="business" element={<Business />} />
            <Route path="news" element={<News />} />
            <Route path="participate" element={<Participate />} />
            <Route path="contact" element={<Contact />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route index element={<AdminDashboard />} />
          </Route>
        </Routes>
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
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
