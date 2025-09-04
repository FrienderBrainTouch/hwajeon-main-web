import React from 'react';
import { Tabs, TabsList, TabsTrigger } from './tabs';
import { cn } from '../../lib/utils';

// shadcn/ui Select import
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select'; // ← 경로 맞춰주세요

export interface TabItem {
  id: string;
  label: string;
  value: string;
}

interface TabNavigationProps {
  tabs: TabItem[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  tabs,
  defaultValue,
  value,
  onValueChange,
  className,
}) => {
  const current = value ?? defaultValue ?? tabs[0]?.value;

  return (
    <div className={cn('w-full flex justify-center', className)}>
      <Tabs
        defaultValue={defaultValue || tabs[0]?.value}
        value={value}
        onValueChange={onValueChange}
        className="w-[90%] max-w-[1400px] min-w-[320px]"
      >
        {/* 데스크톱(>=lg): 탭 네비게이션 */}
        <TabsList className="hidden lg:block h-auto p-0 bg-transparent border border-gray-200 rounded-none w-full">
          <div className="flex lg:flex-1 min-w-0">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.value}
                className={cn(
                  'h-12 px-2 sm:px-4 py-3 text-xs sm:text-sm font-medium transition-all duration-200',
                  'border-r border-gray-200 last:border-r-0',
                  'data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:font-semibold data-[state=active]:border-b-2 data-[state=active]:border-b-blue-600',
                  'data-[state=inactive]:bg-[#5A4C931A] data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:bg-[#5A4C9320]',
                  'rounded-none focus-visible:outline-none focus-visible:ring-0',
                  'flex items-center justify-center text-center',
                  'lg:flex-1 lg:min-w-0 lg:truncate'
                )}
                title={tab.label}
              >
                <span className="truncate">{tab.label}</span>
              </TabsTrigger>
            ))}
          </div>
        </TabsList>

        {/* 모바일(<lg): 커스텀 드롭다운 */}
        <div className="lg:hidden w-full">
          <label className="sr-only" htmlFor="mobile-tabs">
            섹션 선택
          </label>
          <Select value={current} onValueChange={(v: string) => onValueChange?.(v)}>
            <SelectTrigger
              id="mobile-tabs"
              className={cn(
                'w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm font-medium text-gray-900',
                'focus:outline-none focus:ring-0 focus:border-gray-400'
              )}
            >
              <SelectValue placeholder="선택하세요" />
            </SelectTrigger>

            <SelectContent
              className={cn(
                'z-50 rounded-xl border border-gray-200 bg-white shadow-xl',
                'p-1',
                '[&_[role=option]]:rounded-lg [&_[role=option]]:px-3 [&_[role=option]]:py-2',
                '[&_[role=option]]:text-sm [&_[role=option]]:text-gray-900',
                "[&_[role=option][data-state='checked']]:bg-[#5A4C931A]",
                '[&_[role=option]:hover]:bg-[#5A4C9310]'
              )}
              position="popper"
              sideOffset={6}
              align="start"
            >
              {tabs.map((t) => (
                <SelectItem key={t.id} value={t.value} className="cursor-pointer">
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Tabs>
    </div>
  );
};

export default TabNavigation;
