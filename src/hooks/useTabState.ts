import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { TabItem, UseTabStateReturn } from '@/types/hooks/useTabState';

export function useTabState(tabs: TabItem[], defaultTab: string): UseTabStateReturn {
  const [searchParams, setSearchParams] = useSearchParams();

  // 초기값을 URL에서 읽어오기 (없으면 defaultTab 사용)
  const getInitialTab = () => {
    const tabFromUrl = searchParams.get('tab');
    if (tabFromUrl && tabs.some((tab) => tab.value === tabFromUrl)) {
      return tabFromUrl;
    }
    return defaultTab;
  };

  const [activeTab, setActiveTab] = useState(getInitialTab);

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
