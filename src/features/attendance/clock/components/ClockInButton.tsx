'use client';

import { LogIn } from 'lucide-react';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { formatMinutesToTimeString } from '@/lib/dateClient';
import { clockIn } from '../api/clockIn';
import { AttendanceStatus } from '../types/types';
import { AttendanceConfirmDialog } from './AttendanceConfirmDialog';

interface ClockInButtonProps {
  onSuccess: (status: AttendanceStatus) => void;
}

export const ClockInButton = ({ onSuccess }: ClockInButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const handleStartTime = () => {
    startTransition(async () => {
      const result = await clockIn();
      if (result.success && result.startTime != null) {
        toast.success(`出勤しました（${formatMinutesToTimeString(result.startTime)}）`);
        onSuccess({ type: 'clocked_in', startTime: result.startTime });
      } else {
        toast.error(result.error ?? '予期せぬエラーが発生しました');
      }
    });
  };

  return (
    <AttendanceConfirmDialog
      title="出勤しますか？"
      description="現在時刻で出勤を記録します。"
      onConfirm={handleStartTime}
      disabled={isPending}
    >
      <Button
        size="sm"
        disabled={isPending}
        className="text-xs px-3 py-1.5 h-auto bg-blue-600 hover:bg-blue-700 text-white"
      >
        <LogIn className="h-3 w-3 mr-1" />
        {isPending ? '処理中...' : '出勤'}
      </Button>
    </AttendanceConfirmDialog>
  );
};
