'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { REQUEST_CATEGORIES } from '@/consts/requestsCategory';
import { URLS } from '@/consts/urls';
import { ActionStateResult } from '@/lib/actionTypes';
import { actionErrorHandler } from '@/lib/errorHandler';
import { processApproval } from '../lib/approvalHandler';
import { BatchApprovalSchema, IndividualApprovalSchema } from '../lib/formSchema';
import { requireApprovalManagement } from '../lib/roleGuard';

export const approveAttendanceAction = async (
  values: z.infer<typeof IndividualApprovalSchema>,
): Promise<ActionStateResult> => {
  try {
    const authResult = await requireApprovalManagement();
    if (!authResult.success) return { success: false, error: authResult.error.message };

    const user = authResult.data;

    await processApproval({
      target: REQUEST_CATEGORIES.ATTENDANCE.value,
      stepId: values.id,
      approverId: user.id,
      action: values.action,
      comment: values.comment,
    });

    revalidatePath(URLS.APPROVAL, 'layout');
    return { success: true };
  } catch (error) {
    return actionErrorHandler(error);
  }
};

export const batchApproveAttendanceAction = async (
  values: z.infer<typeof BatchApprovalSchema>,
): Promise<ActionStateResult> => {
  try {
    const authResult = await requireApprovalManagement();
    if (!authResult.success) return { success: false, error: authResult.error.message };

    const user = authResult.data;

    await Promise.all(
      values.ids.map((id) =>
        processApproval({
          target: REQUEST_CATEGORIES.ATTENDANCE.value,
          stepId: id,
          approverId: user.id,
          action: values.action,
          comment: values.comment,
        }),
      ),
    );

    revalidatePath(URLS.APPROVAL, 'layout');
    return { success: true };
  } catch (error) {
    return actionErrorHandler(error);
  }
};
