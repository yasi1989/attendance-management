import { StatusType } from '@/types/statusType';

export const TABLE_UTILS = {
  status: {
    canRequest: (status: StatusType) => {
      const submittableStatuses: StatusType[] = ['Rejected', 'Draft'];
      return submittableStatuses.includes(status);
    },
    canApprove: (status: StatusType) => {
      const approvalStatuses: StatusType[] = ['Submitted'];
      return approvalStatuses.includes(status);
    },
  },
} as const;
