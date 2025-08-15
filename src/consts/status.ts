import { FileText, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

export const STATUS = {
  PENDING: { value: 'Pending', label: '未申請', icon: FileText },
  SUBMITTED: { value: 'Submitted', label: '申請済み', icon: Clock },
  REJECTED: { value: 'Rejected', label: '却下', icon: AlertTriangle },
  APPROVED: { value: 'Approved', label: '承認済み', icon: CheckCircle },
} as const;

export const STATUS_WITH_ALL = {
  ALL: { value: 'All', label: 'すべて' },
  ...STATUS,
} as const;

export const STATUS_ACTIONS = {
  actionRequest: [STATUS.SUBMITTED.value] as const,
  actionApprovalOrRejection: [STATUS.APPROVED.value, STATUS.REJECTED.value] as const,
  canRequest: [STATUS.PENDING.value, STATUS.REJECTED.value] as const,
  canApprovalOrRejection: [STATUS.SUBMITTED.value] as const,
} as const;

export const STATUS_LIST = [...Object.values(STATUS).map((status) => status.value)] as const;
export const STATUS_WITH_ALL_LIST = [...Object.values(STATUS_WITH_ALL).map((status) => status.value)] as const;
