import type { AttendanceStatus } from '../types/types';
import { DesktopAttendanceButton } from './DesktopAttendanceButton';
import { MobileAttendanceButton } from './MobileAttendanceButton';

interface AttendanceButtonProps {
  initialStatus: AttendanceStatus;
  variant?: 'desktop' | 'mobile';
  onStatusChange?: (status: AttendanceStatus) => void;
}

export const AttendanceButton = ({ initialStatus, variant = 'desktop', onStatusChange }: AttendanceButtonProps) =>
  variant === 'desktop' ? (
    <DesktopAttendanceButton initialStatus={initialStatus} onStatusChange={onStatusChange} />
  ) : (
    <MobileAttendanceButton initialStatus={initialStatus} onStatusChange={onStatusChange} />
  );
