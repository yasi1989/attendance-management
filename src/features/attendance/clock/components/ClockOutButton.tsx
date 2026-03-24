'use client';

import { LogOut } from 'lucide-react';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { formatMinutesToTimeString } from '@/lib/dateClient';
import { clockOut } from '../api/clockOut';
import type { AttendanceStatus } from '../types/types';
import { AttendanceConfirmDialog } from './AttendanceConfirmDialog';

interface ClockOutButtonProps {
  onSuccess: (status: AttendanceStatus) => void;
}

export const ClockOutButton = ({ onSuccess }: ClockOutButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const handleEndTime = () => {
    startTransition(async () => {
      const result = await clockOut();
      if (result.success && result.endTime != null) {
        toast.success(`退勤しました（${formatMinutesToTimeString(result.endTime)}）`);
        onSuccess({ type: 'clocked_out' });
      } else {
        toast.error(result.error ?? '予期せぬエラーが発生しました');
      }
    });
  };

  return (
    <AttendanceConfirmDialog
      title="退勤しますか？"
      description="現在時刻で退勤を記録します。"
      onConfirm={handleEndTime}
      disabled={isPending}
    >
      <Button
        size="sm"
        disabled={isPending}
        className="text-xs px-3 py-1.5 h-auto bg-red-600 hover:bg-red-700 text-white"
      >
        <LogOut className="h-3 w-3 mr-1" />
        {isPending ? '処理中...' : '退勤'}
      </Button>
    </AttendanceConfirmDialog>
  );
};
