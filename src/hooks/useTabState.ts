import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

interface TabItem {
  value: string;
}

export function useTabState(tabs: TabItem[], defaultTab: string) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(defaultTab);

  // URL에서 탭 파라미터 읽기
  useEffect(() => {
    const tabFromUrl = searchParams.get('tab');
    if (tabFromUrl && tabs.some((tab) => tab.value === tabFromUrl)) {
      setActiveTab(tabFromUrl);
    }
  }, [searchParams, tabs]);

  // 탭 변경 시 URL 업데이트
  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    setSearchParams({ tab: newTab });
  };

  return {
    activeTab,
    handleTabChange,
  };
}
