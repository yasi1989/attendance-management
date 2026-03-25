import { HeaderStatusBadge } from '@/components/layout/HeaderStatusBadge';
import { DEVICE_VARIANT } from '@/consts/form';
import { getTodayAttendanceStatus } from '@/features/attendance/clock/lib/getTodayAttendanceStatus';
import { ClockButton } from './ClockButton';

export const ClockSection = async () => {
  const todayStatus = await getTodayAttendanceStatus();

  return (
    <>
      <div className="hidden md:block">
        <HeaderStatusBadge initialStatus={todayStatus} />
      </div>
      <div className="hidden lg:block">
        <ClockButton variant={DEVICE_VARIANT.DESKTOP} initialStatus={todayStatus} />
      </div>
      <div className="lg:hidden">
        <ClockButton variant={DEVICE_VARIANT.MOBILE} initialStatus={todayStatus} />
      </div>
    </>
  );
};
