import { Lock } from 'lucide-react';
import { CLOCK_BUTTON_LOCKED_LABELS } from '../consts/constants';
import { ClockStatus } from '../types/types';

interface LockedClockBadgeProps {
  status: ClockStatus['type'];
  showLabel?: boolean;
}

export const LockedClockBadge = ({ status, showLabel = true }: LockedClockBadgeProps) => (
  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded text-xs text-gray-500 dark:text-gray-400">
    <Lock className="h-3 w-3 shrink-0" />
    {showLabel && <span>{CLOCK_BUTTON_LOCKED_LABELS[status] ?? '打刻不可'}</span>}
  </div>
);
