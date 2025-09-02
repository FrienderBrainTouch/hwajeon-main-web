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
    <div className="min-h-screen bg-[#F6F5FA]">
      <div className="mx-auto w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 py-6 xs:py-8 sm:py-10 md:py-12 lg:py-14 xl:py-16 2xl:py-20">
        <QuickLinks />
        <GlanceCards />
      </div>

      <HeroCarousel />

      <div className="mx-auto w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 py-6 xs:py-8 sm:py-10 md:py-12 lg:py-14 xl:py-16 2xl:py-20">
        <NewsSection />
        <NoticeSection />
      </div>

      <EventSchedule />
      <LocationSection />

      <div className="mx-auto w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
        <CTABanner />
      </div>
    </div>
  );
}

export default Main;
