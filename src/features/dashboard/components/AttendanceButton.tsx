// components/AttendanceButton.tsx
'use client';

import { Button } from '@/components/ui/button';
import { LogIn, LogOut } from 'lucide-react';
import { useState } from 'react';

interface AttendanceButtonProps {
  className?: string;
  variant?: 'desktop' | 'mobile';
  onClockIn?: (time: string) => void;
  onClockOut?: (time: string) => void;
  initialWorkingState?: boolean;
  initialWorkStartTime?: string | null;
}

export const AttendanceButton = ({
  className = '',
  variant = 'desktop',
  onClockIn,
  onClockOut,
  initialWorkingState = false,
  initialWorkStartTime = null,
}: AttendanceButtonProps) => {
  const { isWorking, clockIn, clockOut } = useAttendanceState(initialWorkingState, initialWorkStartTime);

  const handleClockIn = () => {
    const time = clockIn();
    onClockIn?.(time);
    console.log('出勤しました:', time);
  };

  const handleClockOut = () => {
    const time = clockOut();
    onClockOut?.(time);
    console.log('退勤しました:', time);
  };

  if (variant === 'desktop') {
    return (
      <div
        className={`flex items-center gap-1 bg-gray-50 dark:bg-gray-800 p-1 rounded border border-gray-200 dark:border-gray-700 ${className}`}
      >
        <Button
          size="sm"
          variant={isWorking ? 'secondary' : 'default'}
          className={`text-xs px-3 py-1.5 h-auto ${
            isWorking
              ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600 text-white'
          }`}
          onClick={handleClockIn}
          disabled={isWorking}
        >
          <LogIn className="h-3 w-3 mr-1" />
          出勤
        </Button>

        <Button
          size="sm"
          variant={!isWorking ? 'secondary' : 'destructive'}
          className={`text-xs px-3 py-1.5 h-auto ${
            !isWorking
              ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              : 'bg-red-600 dark:bg-red-700 hover:bg-red-700 dark:hover:bg-red-600 text-white'
          }`}
          onClick={handleClockOut}
          disabled={!isWorking}
        >
          <LogOut className="h-3 w-3 mr-1" />
          退勤
        </Button>
      </div>
    );
  }

  return (
    <Button
      variant={isWorking ? 'destructive' : 'default'}
      size="sm"
      className={`text-xs px-3 py-1.5 h-auto ${className}`}
      onClick={isWorking ? handleClockOut : handleClockIn}
    >
      {isWorking ? <LogOut className="h-3 w-3 mr-1" /> : <LogIn className="h-3 w-3 mr-1" />}
      {isWorking ? '退勤' : '出勤'}
    </Button>
  );
};

export const useAttendanceState = (initialState = false, initialTime: string | null = null) => {
  const [isWorking, setIsWorking] = useState(initialState);
  const [workStartTime, setWorkStartTime] = useState<string | null>(initialTime);

  const clockIn = () => {
    const now = new Date().toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit',
    });
    setIsWorking(true);
    setWorkStartTime(now);
    return now;
  };

  const clockOut = () => {
    const now = new Date().toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit',
    });
    setIsWorking(false);
    setWorkStartTime(null);
    return now;
  };

  return {
    isWorking,
    workStartTime,
    clockIn,
    clockOut,
  };
};
