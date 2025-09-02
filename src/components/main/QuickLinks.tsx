import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

function QuickLinks() {
  const navigate = useNavigate();

  const quickLinks = useMemo(
    () => [
      { label: '조합 소개', path: '/combination', emoji: '👥' },
      { label: '사업 안내', path: '/business', emoji: '📦' },
      { label: '카페 27b', path: '/business', emoji: '☕️' },
      { label: '소식', path: '/news', emoji: '📰' },
      { label: '참여하기', path: '/participate', emoji: '🙌' },
      { label: '문의', path: '/contact', emoji: '✉️' },
    ],
    []
  );

  return (
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
  );
}

export default QuickLinks;
