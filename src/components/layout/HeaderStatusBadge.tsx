'use client';

import { formatMinutesToTimeString } from '@/lib/dateClient';

interface HeaderStatusBadgeProps {
  isClockedIn: boolean;
  startTime?: number;
}

export const HeaderStatusBadge = ({ isClockedIn, startTime }: HeaderStatusBadgeProps) => {
  return (
    <div
      className={`flex items-center gap-2 px-3 py-1.5 border rounded-lg text-sm backdrop-blur-sm shadow-sm transition-all duration-200 ${
        isClockedIn
          ? 'bg-linear-to-r from-green-50/90 to-emerald-50/90 dark:from-green-900/30 dark:to-emerald-900/30 border-green-200/50 dark:border-green-800/50 text-green-800 dark:text-green-300'
          : 'bg-linear-to-r from-slate-50/90 to-gray-50/90 dark:from-slate-800/80 dark:to-gray-800/80 border-slate-200/50 dark:border-slate-700/50 text-slate-600 dark:text-slate-400'
      }`}
    >
      <div
        className={`w-2 h-2 rounded-full ${isClockedIn ? 'bg-green-500 dark:bg-green-400' : 'bg-slate-400 dark:bg-slate-500'}`}
      />
      <span className="font-medium">{isClockedIn ? '勤務中' : '退勤中'}</span>
      {isClockedIn && startTime != null && (
        <span className="text-xs opacity-80">({formatMinutesToTimeString(startTime)}〜)</span>
      )}
    </div>
  );
};
