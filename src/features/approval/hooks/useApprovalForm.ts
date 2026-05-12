import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { STATUS } from '@/consts/status';
import { ERROR_MESSAGE } from '@/consts/validate';
import { ActionStatusType, ApprovalCommentSchema, type ApprovalCommentType } from '../lib/formSchema';

export const useIndividualApproval = (
  _stepId: string,
  onSubmit: (action: ActionStatusType, comment?: string) => Promise<void>,
) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<ApprovalCommentType>({
    resolver: zodResolver(ApprovalCommentSchema),
    defaultValues: { comment: '' },
  });

  const handleApproval = (action: ActionStatusType) => {
    startTransition(async () => {
      try {
        const { comment } = form.getValues();
        await onSubmit(action, comment);
        toast.success(`${action === STATUS.APPROVED.value ? '承認' : '却下'}しました。`);
        form.reset();
      } catch (error) {
        if (error instanceof Error) {
          toast.error(`${ERROR_MESSAGE.APPLICATION_ERROR}: ${error.message}`);
        } else {
          toast.error(ERROR_MESSAGE.SYSTEM_ERROR);
        }
      }
    });
  };

  return { form, handleApproval, isPending };
};

export const useBatchApproval = (
  onSubmit: (action: ActionStatusType, selectedIds: string[], comment?: string) => Promise<void>,
) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<ApprovalCommentType>({
    resolver: zodResolver(ApprovalCommentSchema),
    defaultValues: { comment: '' },
  });

  const handleBatchApproval = (action: ActionStatusType, selectedIds: string[]) => {
    startTransition(async () => {
      try {
        if (selectedIds.length === 0) {
          toast.error('承認対象を選択してください');
          return;
        }
        const { comment } = form.getValues();
        await onSubmit(action, selectedIds, comment);
        toast.success(`一括${action === STATUS.APPROVED.value ? '承認' : '却下'}しました。`);
        form.reset();
      } catch (error) {
        if (error instanceof Error) {
          toast.error(`${ERROR_MESSAGE.APPLICATION_ERROR}: ${error.message}`);
        } else {
          toast.error(ERROR_MESSAGE.SYSTEM_ERROR);
        }
      }
    });
  };

  return { form, handleBatchApproval, isPending };
};
