import { ActionStateResult } from '@/lib/actionTypes';
import { CLOCK_STATUS_TYPE, CLOCK_USER_TYPE } from '../consts/constants';

export type ClockStatus =
  | { type: typeof CLOCK_STATUS_TYPE.NOT_STARTED }
  | { type: typeof CLOCK_STATUS_TYPE.CLOCKED_IN; startTime: number }
  | { type: typeof CLOCK_STATUS_TYPE.CLOCKED_OUT }
  | { type: typeof CLOCK_STATUS_TYPE.SUBMITTED }
  | { type: typeof CLOCK_STATUS_TYPE.APPROVED }
  | { type: typeof CLOCK_STATUS_TYPE.SYSTEM_ADMIN };

export type ClockUserContext =
  | { type: typeof CLOCK_USER_TYPE.SYSTEM_ADMIN }
  | { type: typeof CLOCK_USER_TYPE.WITH_COMPANY; userId: string; companyId: string }
  | { type: typeof CLOCK_USER_TYPE.PERSONAL; userId: string };

export type ClockInResult = ActionStateResult & { startTime?: number };
export type ClockOutResult = ActionStateResult & { endTime?: number };
