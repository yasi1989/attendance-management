import { STATUS, STATUS_ACTIONS, STATUS_WITH_ALL_LIST } from '@/consts/status';
import { StatusTypeWithAll } from '@/types/statusType';

export const getStatusByValue = (value: string) => {
  return Object.values(STATUS).find((status) => status.value === value);
};

export const canPerformRequest = (status: string) => {
  return (STATUS_ACTIONS.canRequest as readonly string[]).includes(status);
};

export const canPerformApprovalOrRejection = (status: string) => {
  return (STATUS_ACTIONS.canApprovalOrRejection as readonly string[]).includes(status);
};

export const isValidStatusWithAll = (status: string): status is StatusTypeWithAll => {
  return STATUS_WITH_ALL_LIST.includes(status as StatusTypeWithAll);
};