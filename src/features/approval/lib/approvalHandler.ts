import { and, eq } from 'drizzle-orm';
import { REQUEST_CATEGORIES, RequestCategoryType } from '@/consts/requestsCategory';
import { STATUS } from '@/consts/status';
import { db } from '@/lib/db/drizzle';
import {
  attendanceApprovalSteps,
  expenseGroupApprovalSteps,
  groupExpenseApprovals,
  monthlyAttendanceApprovals,
} from '@/lib/db/schema';
import { ActionStatusType } from './formSchema';

type ProcessApprovalParams = {
  target: RequestCategoryType;
  stepId: string;
  approverId: string;
  action: ActionStatusType;
  comment?: string;
};

export const processApproval = async ({
  target,
  stepId,
  approverId,
  action,
  comment,
}: ProcessApprovalParams): Promise<void> => {
  if (target === REQUEST_CATEGORIES.ATTENDANCE.value) {
    await processAttendanceApproval({ stepId, approverId, action, comment });
  } else {
    await processExpenseApproval({ stepId, approverId, action, comment });
  }
};

const processAttendanceApproval = async ({
  stepId,
  approverId,
  action,
  comment,
}: Omit<ProcessApprovalParams, 'target'>) => {
  const step = await db.query.attendanceApprovalSteps.findFirst({
    where: and(eq(attendanceApprovalSteps.id, stepId), eq(attendanceApprovalSteps.approverId, approverId)),
  });

  if (!step) throw new Error('承認ステップが見つかりませんでした');

  await db
    .update(attendanceApprovalSteps)
    .set({ statusCode: action, approvedAt: new Date(), comment: comment ?? null })
    .where(eq(attendanceApprovalSteps.id, stepId));

  if (action === STATUS.REJECTED.value) {
    await db
      .update(monthlyAttendanceApprovals)
      .set({ statusCode: STATUS.REJECTED.value })
      .where(eq(monthlyAttendanceApprovals.id, step.monthlyAttendanceApprovalId));
    return;
  }

  const nextStep = await db.query.attendanceApprovalSteps.findFirst({
    where: and(
      eq(attendanceApprovalSteps.monthlyAttendanceApprovalId, step.monthlyAttendanceApprovalId),
      eq(attendanceApprovalSteps.stepOrder, step.stepOrder + 1),
    ),
  });

  if (nextStep) {
    await db
      .update(attendanceApprovalSteps)
      .set({ statusCode: STATUS.SUBMITTED.value })
      .where(eq(attendanceApprovalSteps.id, nextStep.id));
  } else {
    await db
      .update(monthlyAttendanceApprovals)
      .set({ statusCode: STATUS.APPROVED.value })
      .where(eq(monthlyAttendanceApprovals.id, step.monthlyAttendanceApprovalId));
  }
};

const processExpenseApproval = async ({
  stepId,
  approverId,
  action,
  comment,
}: Omit<ProcessApprovalParams, 'target'>) => {
  const step = await db.query.expenseGroupApprovalSteps.findFirst({
    where: and(eq(expenseGroupApprovalSteps.id, stepId), eq(expenseGroupApprovalSteps.approverId, approverId)),
  });

  if (!step) throw new Error('承認ステップが見つかりませんでした');

  await db
    .update(expenseGroupApprovalSteps)
    .set({ statusCode: action, approvedAt: new Date(), comment: comment ?? null })
    .where(eq(expenseGroupApprovalSteps.id, stepId));

  if (action === STATUS.REJECTED.value) {
    await db
      .update(groupExpenseApprovals)
      .set({ statusCode: STATUS.REJECTED.value })
      .where(eq(groupExpenseApprovals.id, step.groupExpenseApprovalId));
    return;
  }

  const nextStep = await db.query.expenseGroupApprovalSteps.findFirst({
    where: and(
      eq(expenseGroupApprovalSteps.groupExpenseApprovalId, step.groupExpenseApprovalId),
      eq(expenseGroupApprovalSteps.stepOrder, step.stepOrder + 1),
    ),
  });

  if (nextStep) {
    await db
      .update(expenseGroupApprovalSteps)
      .set({ statusCode: STATUS.SUBMITTED.value })
      .where(eq(expenseGroupApprovalSteps.id, nextStep.id));
  } else {
    await db
      .update(groupExpenseApprovals)
      .set({ statusCode: STATUS.APPROVED.value })
      .where(eq(groupExpenseApprovals.id, step.groupExpenseApprovalId));
  }
};
