interface FloatingButtonsProps {
  onInquiry?: () => void;
  onScrollToTop?: () => void;
}

function FloatingButtons({ onInquiry, onScrollToTop }: FloatingButtonsProps) {
  const handleScrollToTop = () => {
    if (onScrollToTop) {
      onScrollToTop();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed right-4 bottom-4 flex flex-col gap-3 z-50">
      {/* 위로 가기 버튼 */}
      <button
        onClick={handleScrollToTop}
        className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-white hover:bg-gray-600 transition-colors"
        aria-label="맨 위로 가기"
      >
        ↑
      </button>

      {/* 문의하기 버튼 */}
      <button
        onClick={onInquiry}
        className="w-12 h-12 bg-[#2B2A4C] rounded-full flex flex-col items-center justify-center text-white hover:bg-[#262544] transition-colors text-xs"
        aria-label="문의하기"
      >
        <span>문의하기</span>
      </button>
    </div>
  );
}

export default FloatingButtons;
