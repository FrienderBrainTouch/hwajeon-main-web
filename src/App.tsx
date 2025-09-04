import { useMemo, useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header, Footer } from '@/components/layout';
import Main from './pages/Main';
import Combination from './pages/Combination';
import Business from './pages/Business';
import News from './pages/News';
import Participate from './pages/Participate';
import Contact from './pages/Contact';
import MemberLayout from './routes/MemberLayout';
import AdminLayout from './routes/AdminLayout';
import { Hero } from '@/components/main';
import HeaderImg from '@/assets/header.png';
// import HeaderTextImg from '@/assets/header_text.png';

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

  // 헤더 전환 / 히어로 진행도 상태 (Header 컴포넌트로 이동하여 더 이상 사용되지 않음)
  // const [_solid, setSolid] = useState(false);
  const [progress, setProgress] = useState(0); // 0~1
  const heroRef = useRef<HTMLDivElement>(null!);
  // const sentinelRef = useRef<HTMLDivElement | null>(null);

  // 교차 관찰: 히어로가 지나가면 헤더 솔리드로 (Header 컴포넌트로 이동하여 더 이상 사용되지 않음)
  // useEffect(() => {
  //   const target = sentinelRef.current;
  //   if (!target) return;
  //   const io = new IntersectionObserver(
  //     ([e]) => setSolid(!e.isIntersecting),
  //     { rootMargin: '-72px 0px 0px 0px', threshold: 0 } // 헤더 높이 보정
  //   );
  //   io.observe(target);
  //   return () => io.disconnect();
  // }, [route]);

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

  return (
    <div>
      {/* 고정 헤더 */}
      <Header />
      {/* <Header variant="overlay" /> - variant prop이 더 이상 사용되지 않음 */}

      {/* 히어로 (모든 페이지 공통) */}
      <Hero
        refEl={heroRef}
        src={HeaderImg}
        title={heroConf.title}
        subtitle={heroConf.subtitle}
        heightVh={heroConf.heightVh ?? 40}
        progress={progress}
      />

      {/* 히어로가 끝나는 지점에 센티넬(헤더 전환 트리거) - Header 컴포넌트로 이동하여 더 이상 사용되지 않음 */}
      {/* <div ref={sentinelRef} className="h-px w-full" /> */}
      <main>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/member" element={<MemberLayout />}>
            <Route path="combination" element={<Combination />} />
            <Route path="business" element={<Business />} />
            <Route path="news" element={<News />} />
            <Route path="participate" element={<Participate />} />
            <Route path="contact" element={<Contact />} />
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            {/* Admin routes will be added here later */}
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
