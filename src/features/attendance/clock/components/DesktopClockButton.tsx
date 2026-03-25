'use client';

import { useRouter } from 'next/navigation';
import { startTransition, useOptimistic } from 'react';
import { CLOCK_BUTTON_LOCKED_STATUSES, CLOCK_STATUS_TYPE } from '../consts/constants';
import { ClockStatus } from '../types/types';
import { ClockInButton } from './ClockInButton';
import { ClockOutButton } from './ClockOutButton';
import { LockedClockBadge } from './LockedClockBadge';

interface DesktopClockButtonProps {
  initialStatus: ClockStatus;
  onStatusChange?: (status: ClockStatus) => void;
}

export const DesktopClockButton = ({ initialStatus, onStatusChange }: DesktopClockButtonProps) => {
  const router = useRouter();
  const [status, setOptimisticStatus] = useOptimistic<ClockStatus, ClockStatus>(
    initialStatus,
    (_current, next) => next,
  );

  const handleStatusChange = (next: ClockStatus) => {
    startTransition(() => {
      setOptimisticStatus(next);
      onStatusChange?.(next);
      router.refresh();
    });
  };

  if (CLOCK_BUTTON_LOCKED_STATUSES.has(status.type)) {
    return <LockedClockBadge status={status.type} />;
  }

  const isNotStarted = status.type === CLOCK_STATUS_TYPE.NOT_STARTED;

  return (
    <div className="flex items-center gap-1 bg-gray-50 dark:bg-gray-800 p-1 rounded border border-gray-200 dark:border-gray-700">
      <div className={isNotStarted ? '' : 'opacity-40 pointer-events-none'}>
        <ClockInButton onSuccess={handleStatusChange} />
      </div>
      <div className={isNotStarted ? 'opacity-40 pointer-events-none' : ''}>
        <ClockOutButton onSuccess={handleStatusChange} />
      </div>
    </div>
  );
};
