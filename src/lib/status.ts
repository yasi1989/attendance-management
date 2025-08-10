import { STATUS, STATUS_ACTIONS } from '@/consts/status';

export const getStatusByValue = (value: string) => {
  return Object.values(STATUS).find((status) => status.value === value);
};

export const canPerformRequest = (status: string) => {
  return (STATUS_ACTIONS.canRequest as readonly string[]).includes(status);
};

export const canPerformApprovalOrRejection = (status: string) => {
  return (STATUS_ACTIONS.canApprovalOrRejection as readonly string[]).includes(status);
};
