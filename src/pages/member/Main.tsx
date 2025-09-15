import {
  QuickLinks,
  GlanceCards,
  HeroCarousel,
  NewsSection,
  NoticeSection,
  EventSchedule,
  LocationSection,
  CTABanner,
} from '@/components/main';
import FloatingButtons from '@/components/ui/FloatingButtons';
import { useNavigate } from 'react-router-dom';

function Main() {
  const navigate = useNavigate();

  const handleInquiry = () => {
    navigate('/member/contact');
  };

  return (
    <div className="min-h-screen bg-white">
      <QuickLinks />
      <GlanceCards />
      <HeroCarousel />
      <NewsSection />
      <NoticeSection />
      <EventSchedule />
      <LocationSection />
      <CTABanner />

      {/* 플로팅 버튼들 */}
      <FloatingButtons onInquiry={handleInquiry} />
    </div>
  );
}

export default Main;
