import { DEVICE_VARIANT } from '@/consts/form';
import { DeviceVariantType } from '@/types/form';
import { ClockStatus } from '../types/types';
import { DesktopClockButton } from './DesktopClockButton';
import { MobileClockButton } from './MobileClockButton';

interface ClockButtonProps {
  initialStatus: ClockStatus;
  variant?: DeviceVariantType;
  onStatusChange?: (status: ClockStatus) => void;
}

export const ClockButton = ({ initialStatus, variant = DEVICE_VARIANT.DESKTOP, onStatusChange }: ClockButtonProps) =>
  variant === DEVICE_VARIANT.DESKTOP ? (
    <DesktopClockButton initialStatus={initialStatus} onStatusChange={onStatusChange} />
  ) : (
    <MobileClockButton initialStatus={initialStatus} onStatusChange={onStatusChange} />
  );
