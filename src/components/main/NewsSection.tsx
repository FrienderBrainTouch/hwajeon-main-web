import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '@/hooks/useApi';
import { memberPostsApi } from '@/api/member';
import { type PostSummary } from '@/types/api/responses';

function NewsSection() {
  const navigate = useNavigate();
  const [news, setNews] = useState<PostSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // API 호출
  const getNewsApi = useApi(memberPostsApi.getPosts);

  // API에서 데이터 가져오기
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getNewsApi.execute({ postType: 'NEWS' });

        if (response && response.content) {
          // 최신 4개만 가져오기
          setNews(response.content.slice(0, 4));
        }
      } catch (error) {
        console.error('뉴스 데이터를 가져오는 중 오류 발생:', error);
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="mx-auto w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 py-6 xs:py-8 sm:py-10 md:py-12 lg:py-14 xl:py-16 2xl:py-20">
      <section className="mt-10 xs:mt-12 sm:mt-14 md:mt-16 lg:mt-18 xl:mt-20 2xl:mt-24">
        <div className="flex items-center justify-between">
          <h2 className="text-lg xs:text-xl sm:text-xl md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl font-semibold text-gray-900">
            최근 소식
          </h2>
          <button
            onClick={() => navigate('/member/news?tab=news')}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            더보기
          </button>
        </div>
        <p className="mt-1 text-xs xs:text-sm sm:text-sm md:text-sm lg:text-base xl:text-base 2xl:text-lg text-gray-500">
          화전마을 사회적협동조합의 새로운 소식입니다.
        </p>

        <div className="mt-4 xs:mt-5 sm:mt-6 md:mt-6 lg:mt-7 xl:mt-8 2xl:mt-10">
          {loading ? (
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-4 xs:gap-5 sm:gap-6 md:gap-4 lg:gap-5 xl:gap-6 2xl:gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-4 xs:p-5 sm:p-6 shadow-lg border border-gray-100"
                >
                  <div className="aspect-[4/3] bg-gray-200 rounded-lg mb-4 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="bg-white rounded-xl p-8 text-center">
              <div className="text-gray-500 mb-2">⚠️</div>
              <p className="text-gray-600">{error}</p>
            </div>
          ) : news.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center">
              <div className="text-4xl mb-4">📰</div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">최근 소식이 없습니다</h3>
              <p className="text-gray-500">새로운 소식이 업데이트되면 알려드리겠습니다.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-4 xs:gap-5 sm:gap-6 md:gap-4 lg:gap-5 xl:gap-6 2xl:gap-8">
              {news.map((item) => (
                <div
                  key={item.postId}
                  className="bg-white rounded-xl p-4 xs:p-5 sm:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
                >
                  <div className="aspect-[4/3] bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg mb-4 flex items-center justify-center text-4xl group-hover:scale-105 transition-transform duration-300">
                    📰
                  </div>
                  <h3 className="text-sm xs:text-base font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                    {item.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs xs:text-sm text-gray-500">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                      소식
                    </span>
                    <span className="font-medium">
                      {new Date(item.createdAt).toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default NewsSection;
