import React, { useEffect, useState } from 'react';
import type { HistoryItem, HistoryProps } from '@/types/components/combination';
import { historyData as fallbackData } from './data';
import { historyApi, type CompanyHistoryItem } from '@/api/admin/history';

const History: React.FC<HistoryProps> = ({ historyData }) => {
  const [items, setItems] = useState<HistoryItem[]>(historyData ?? fallbackData);
  const [loading, setLoading] = useState(!historyData);

  useEffect(() => {
    if (historyData) return;

    let cancelled = false;
    (async () => {
      try {
        const res = await historyApi.list();
        const list = (res.data ?? []) as CompanyHistoryItem[];
        if (!cancelled && list.length > 0) {
          setItems(
            list.map((h) => ({
              id: h.id,
              year: h.year,
              title: h.title,
              description: h.description,
            }))
          );
        }
      } catch {
        // keep fallback
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [historyData]);

  const sorted = [...items].sort((a, b) => Number(b.year) - Number(a.year));

  return (
    <div className="bg-white py-12 sm:py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">연혁</h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-2xl leading-relaxed">
            화전의 변화는 단절이 아닌 연결의 역사입니다. 지금까지 걸어온 주요 흐름을 시간의 궤도로
            담았습니다.
          </p>
        </div>

        {loading ? (
          <div className="py-16 text-center text-slate-500">연혁을 불러오는 중…</div>
        ) : (
          <ol className="relative">
            {sorted.map((item, index) => (
              <li key={item.id} className="relative grid grid-cols-[5.5rem_1.5rem_1fr] gap-x-3 sm:gap-x-5 pb-12 last:pb-0">
                {/* watermark year */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute right-0 top-0 select-none text-[5.5rem] sm:text-[7rem] font-bold leading-none text-slate-100"
                >
                  {item.year}
                </div>

                <div className="pt-1 text-right">
                  <span className="text-lg sm:text-xl font-semibold text-slate-700 tabular-nums">
                    {item.year}
                  </span>
                </div>

                <div className="relative flex justify-center">
                  <span className="absolute top-2 z-10 h-3 w-3 rounded-full bg-amber-400 ring-4 ring-white" />
                  {index < sorted.length - 1 && (
                    <span className="absolute top-5 bottom-[-3rem] w-px bg-slate-200" />
                  )}
                </div>

                <div className="relative z-10 min-w-0 pt-0.5 pr-2 sm:pr-24">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
};

export default History;
