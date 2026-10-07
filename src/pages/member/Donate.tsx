import { SponsorshipGuide, SponsorshipInquiry } from '@/components/participate';

function Donate() {
  return (
    <div className="w-full pt-8">
      <SponsorshipGuide />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <SponsorshipInquiry />
      </div>
    </div>
  );
}

export default Donate;
