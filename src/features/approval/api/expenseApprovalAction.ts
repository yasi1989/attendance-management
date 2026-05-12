'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { REQUEST_CATEGORIES } from '@/consts/requestsCategory';
import { URLS } from '@/consts/urls';
import { requireExpenseAccess } from '@/features/expense/lib/roleGuard';
import { ActionStateResult } from '@/lib/actionTypes';
import { actionErrorHandler } from '@/lib/errorHandler';
import { processApproval } from '../lib/approvalHandler';
import { BatchApprovalSchema, IndividualApprovalSchema } from '../lib/formSchema';

export const approveExpenseAction = async (
  values: z.infer<typeof IndividualApprovalSchema>,
): Promise<ActionStateResult> => {
  try {
    const authResult = await requireExpenseAccess();
    if (!authResult.success) return { success: false, error: authResult.error.message };

    const user = authResult.data;

    await processApproval({
      target: REQUEST_CATEGORIES.EXPENSE.value,
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

export const batchApproveExpenseAction = async (
  values: z.infer<typeof BatchApprovalSchema>,
): Promise<ActionStateResult> => {
  try {
    const authResult = await requireExpenseAccess();
    if (!authResult.success) return { success: false, error: authResult.error.message };

    const user = authResult.data;

    await Promise.all(
      values.ids.map((id) =>
        processApproval({
          target: REQUEST_CATEGORIES.EXPENSE.value,
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
