import { STATUS_ACTIONS, STATUS_WITH_ALL, STATUS } from '@/consts/status';

export type StatusRequestType = (typeof STATUS_ACTIONS.actionRequest)[number];
export type StatusApprovalOrRejectionType = (typeof STATUS_ACTIONS.actionApprovalOrRejection)[number];
export type StatusType = (typeof STATUS)[keyof typeof STATUS]['value'];
export type StatusTypeWithAll = (typeof STATUS_WITH_ALL)[keyof typeof STATUS_WITH_ALL]['value'];
