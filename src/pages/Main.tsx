import { useNavigate } from 'react-router-dom';

function Main() {
  const navigate = useNavigate();

  const pages = [
    { path: '/combination', label: '조합 소개' },
    { path: '/business', label: '사업 안내' },
    { path: '/news', label: '소식과 자료' },
    { path: '/participate', label: '참여하기' },
    { path: '/contact', label: '문의하기' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
        <h1 className="text-4xl font-normal text-gray-800 mb-8">화전 메인</h1>

        <div className="space-y-4">
          {pages.map((page) => (
            <button
              key={page.path}
              onClick={() => navigate(page.path)}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold"
            >
              {page.label} 페이지로 이동
            </button>
          ))}
        </div>

        <p className="text-gray-500 text-sm mt-6">
          각 버튼을 클릭하여 라우팅이 정상 작동하는지 테스트해보세요!
        </p>
      </div>
    </div>
  );
}

export default Main;
