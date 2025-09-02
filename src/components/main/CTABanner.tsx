import { Button } from '@/components/ui/button';

export default function CTABanner() {
  return (
    <section className="mt-10 xs:mt-12 sm:mt-14 md:mt-16 lg:mt-18 xl:mt-20 2xl:mt-24">
      <div className="bg-gradient-to-r from-[#2B2A4C] to-[#4A4A8C] rounded-xl xs:rounded-2xl p-8 xs:p-10 sm:p-12 md:p-14 lg:p-16 xl:p-18 2xl:p-20 text-center relative overflow-hidden">
        {/* 반짝이는 효과 */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-12 right-1/3 w-1 h-1 bg-white rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-8 left-1/3 w-1.5 h-1.5 bg-white rounded-full animate-pulse delay-500"></div>
          <div className="absolute bottom-16 right-1/4 w-1 h-1 bg-white rounded-full animate-pulse delay-1500"></div>
        </div>

        <h2 className="text-lg xs:text-xl sm:text-xl md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl font-semibold text-white mb-6 xs:mb-8 sm:mb-10 relative z-10">
          화전마을의 일원이 되어 함께하고 싶다면?
        </h2>

        <div className="flex flex-col xs:flex-row gap-3 xs:gap-4 justify-center items-center relative z-10">
          <Button
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-[#2B2A4C]"
          >
            참여하기
          </Button>
          <Button
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-[#2B2A4C]"
          >
            후원/기부
          </Button>
          <Button className="bg-white text-[#2B2A4C] hover:bg-gray-100">문의하기</Button>
        </div>
      </div>
    </section>
  );
}
