'use client';
import { useState } from 'react';

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
