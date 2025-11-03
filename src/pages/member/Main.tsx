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
import PageBanner from '@/components/ui/PageBanner';
import logo from '@/assets/logo.svg';
import FloatingButtons from '@/components/ui/FloatingButtons';
import { useNavigate } from 'react-router-dom';

function Main() {
  const navigate = useNavigate();

  const handleInquiry = () => {
    navigate('/member/contact');
  };

  return (
    <div className="min-h-screen bg-white">
      <PageBanner
        title="화전마을의 일원이 되어 함께하고 싶다면?"
        bullets={['참여하기', '후원/기부', '문의하기']}
        logoSrc={logo}
        bgClass="bg-[#00ACCD]"
        className="rounded-none"
      />
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
