import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

function QuickLinks() {
  const navigate = useNavigate();

  const quickLinks = useMemo(
    () => [
      { label: '조합 소개', path: '/member/combination', emoji: '👥' },
      { label: '사업 안내', path: '/member/business', emoji: '📦' },
      { label: '카페 27b', path: '/member/business?tab=cafe27b', emoji: '☕️' },
      { label: '소식', path: '/member/news?tab=news', emoji: '📰' },
      { label: '참여하기', path: '/member/participate?tab=membership', emoji: '🙌' },
      { label: '문의', path: '/member/contact', emoji: '✉️' },
    ],
    []
  );

  return (
    <div className="mx-auto w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 py-6 xs:py-8 sm:py-10 md:py-12 lg:py-14 xl:py-16 2xl:py-20">
      <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-2 xs:gap-3 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6 2xl:gap-8">
        {quickLinks.map((q) => (
          <button
            key={q.label}
            onClick={() => navigate(q.path)}
            className="rounded-xl xs:rounded-2xl bg-[#2B2A4C] px-2 xs:px-3 py-3 xs:py-4 text-center text-white shadow-sm transition-colors hover:bg-[#262544]"
          >
            <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-lg">
              <span aria-hidden>{q.emoji}</span>
            </div>
            <span className="text-xs xs:text-sm sm:text-sm md:text-base lg:text-base xl:text-lg">
              {q.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuickLinks;
