'use client';

import { useRouter } from 'next/navigation';
import { startTransition, useOptimistic } from 'react';
import { CLOCK_BUTTON_LOCKED_STATUSES, CLOCK_STATUS_TYPE } from '../consts/constants';
import { ClockStatus } from '../types/types';
import { ClockInButton } from './ClockInButton';
import { ClockOutButton } from './ClockOutButton';
import { LockedClockBadge } from './LockedClockBadge';

interface MobileClockButtonProps {
  initialStatus: ClockStatus;
  onStatusChange?: (status: ClockStatus) => void;
}

export const MobileClockButton = ({ initialStatus, onStatusChange }: MobileClockButtonProps) => {
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
    return <LockedClockBadge status={status.type} showLabel={false} />;
  }

  return status.type === CLOCK_STATUS_TYPE.NOT_STARTED ? (
    <ClockInButton onSuccess={handleStatusChange} />
  ) : (
    <ClockOutButton onSuccess={handleStatusChange} />
  );
};
