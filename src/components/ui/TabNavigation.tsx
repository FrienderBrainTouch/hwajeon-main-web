import React from 'react';
import { Tabs, TabsList, TabsTrigger } from './tabs';
import { cn } from '../../lib/utils';

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
  return (
    <div className={cn('w-full flex justify-center', className)}>
      <Tabs
        defaultValue={defaultValue || tabs[0]?.value}
        value={value}
        onValueChange={onValueChange}
        className="w-[90%] max-w-[1400px] min-w-[320px]"
      >
        <TabsList className="h-auto p-0 bg-transparent border border-gray-200 rounded-none w-full">
          {tabs.map((tab, index) => (
            <TabsTrigger
              key={tab.id}
              value={tab.value}
              className={cn(
                'h-12 px-2 sm:px-4 py-3 text-xs sm:text-sm font-medium transition-all duration-200',
                'border-r border-gray-200 last:border-r-0',
                'data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-b-blue-600',
                'data-[state=inactive]:bg-gray-50 data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:bg-gray-100',
                'rounded-none focus-visible:outline-none focus-visible:ring-0',
                'flex items-center justify-center text-center',
                'flex-1 min-w-0'
              )}
            >
              <span className="truncate">{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default TabNavigation;
