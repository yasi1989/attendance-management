'use client';

import { useRouter } from 'next/navigation';
import { startTransition, useOptimistic } from 'react';
import { LOCKED_STATUSES } from '../consts/constants';
import type { AttendanceStatus } from '../types/types';
import { ClockInButton } from './ClockInButton';
import { ClockOutButton } from './ClockOutButton';
import { LockedAttendanceBadge } from './LockedAttendanceBadge';

interface MobileAttendanceButtonProps {
  initialStatus: AttendanceStatus;
  onStatusChange?: (status: AttendanceStatus) => void;
}

export const MobileAttendanceButton = ({ initialStatus, onStatusChange }: MobileAttendanceButtonProps) => {
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
    return <LockedAttendanceBadge status={status.type} showLabel={false} />;
  }

  return status.type === 'not_started' ? (
    <ClockInButton onSuccess={handleStatusChange} />
  ) : (
    <ClockOutButton onSuccess={handleStatusChange} />
  );
};
