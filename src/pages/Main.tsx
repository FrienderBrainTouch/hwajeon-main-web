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

function Main() {
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
    </div>
  );
}

export default Main;
