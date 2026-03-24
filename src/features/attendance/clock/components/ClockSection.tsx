import { HeaderStatusBadge } from '@/components/layout/HeaderStatusBadge';
import { AttendanceButton } from '@/features/attendance/clock/components/AttendanceButton';
import { getTodayAttendanceStatus } from '@/features/attendance/clock/lib/getTodayAttendanceStatus';

export const ClockSection = async () => {
  const todayStatus = await getTodayAttendanceStatus();

  return (
    <>
      <div className="hidden md:block">
        <HeaderStatusBadge initialStatus={todayStatus} />
      </div>
      <div className="hidden lg:block">
        <AttendanceButton variant="desktop" initialStatus={todayStatus} />
      </div>
      <div className="lg:hidden">
        <AttendanceButton variant="mobile" initialStatus={todayStatus} />
      </div>
    </>
  );
};
