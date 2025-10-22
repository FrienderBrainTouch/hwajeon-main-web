import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '@/hooks/useApi';
import { memberPostsApi } from '@/api/member';
import { type PostSummary } from '@/types/api/responses';

function NoticeSection() {
  const navigate = useNavigate();
  const [notices, setNotices] = useState<PostSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // API 호출
  const getNoticesApi = useApi(memberPostsApi.getPosts);

  // API에서 데이터 가져오기
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getNoticesApi.execute({ postType: 'NOTICE' });

        if (response && response.content) {
          // 최신 3개만 가져오기
          setNotices(response.content.slice(0, 3));
        }
      } catch (error) {
        console.error('공지사항 데이터를 가져오는 중 오류 발생:', error);
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  return (
    <div className="mx-auto w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 py-6 xs:py-8 sm:py-10 md:py-12 lg:py-14 xl:py-16 2xl:py-20">
      <section className="mt-20 xs:mt-24 sm:mt-28 md:mt-32 lg:mt-36 xl:mt-40 2xl:mt-48">
        <div className="flex items-center justify-between">
          <h2 className="text-lg xs:text-xl sm:text-xl md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl font-semibold text-gray-900">
            공지사항
          </h2>
          <button
            onClick={() => navigate('/member/news?tab=notice')}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            더보기
          </button>
        </div>

        <div className="mt-4 xs:mt-5 sm:mt-6 md:mt-6 lg:mt-7 xl:mt-8 2xl:mt-10">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-3 xs:py-4 border-b border-gray-100 last:border-b-0"
                >
                  <div className="h-4 bg-gray-200 rounded animate-pulse flex-1 mr-4"></div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-20"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="bg-white rounded-xl p-8 text-center">
              <div className="text-gray-500 mb-2">⚠️</div>
              <p className="text-gray-600">{error}</p>
            </div>
          ) : notices.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center">
              <div className="text-4xl mb-4">📢</div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">공지사항이 없습니다</h3>
              <p className="text-gray-500">새로운 공지사항이 등록되면 알려드리겠습니다.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {notices.map((item) => (
                <div
                  key={item.postId}
                  className="flex items-center justify-between py-3 xs:py-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <h3 className="text-sm xs:text-base text-gray-900 hover:text-gray-700 transition-colors">
                    {item.title}
                  </h3>
                  <span className="text-xs xs:text-sm text-gray-500 ml-4 flex-shrink-0">
                    {new Date(item.createdAt).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default NoticeSection;
