import { DEVICE_VARIANT } from '@/consts/form';

export type DeviceVariantType = (typeof DEVICE_VARIANT)[keyof typeof DEVICE_VARIANT];
