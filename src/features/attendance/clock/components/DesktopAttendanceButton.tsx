'use client';

import { useRouter } from 'next/navigation';
import { startTransition, useOptimistic } from 'react';
import { LOCKED_STATUSES } from '../consts/constants';
import { AttendanceStatus } from '../types/types';
import { ClockInButton } from './ClockInButton';
import { ClockOutButton } from './ClockOutButton';
import { LockedAttendanceBadge } from './LockedAttendanceBadge';

interface DesktopAttendanceButtonProps {
  initialStatus: AttendanceStatus;
  onStatusChange?: (status: AttendanceStatus) => void;
}

export const DesktopAttendanceButton = ({ initialStatus, onStatusChange }: DesktopAttendanceButtonProps) => {
  const router = useRouter();
  const [status, setOptimisticStatus] = useOptimistic<AttendanceStatus, AttendanceStatus>(
    initialStatus,
    (_current, next) => next,
  );

  const handleStatusChange = (next: AttendanceStatus) => {
    startTransition(() => {
      setOptimisticStatus(next);
      onStatusChange?.(next);
      router.refresh();
    });
  };

  if (LOCKED_STATUSES.has(status.type)) {
    return <LockedAttendanceBadge status={status.type} />;
  }

  const isNotStarted = status.type === 'not_started';

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
