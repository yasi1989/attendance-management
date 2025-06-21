import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ApprovalCommentSchema,
  type ApprovalCommentType,
  type IndividualApprovalType,
  type BatchApprovalType,
} from '../lib/formSchema';

// 個別承認用のフック
export const useIndividualApproval = (itemId: string, onSubmit: (data: IndividualApprovalType) => Promise<void>) => {
  const form = useForm<ApprovalCommentType>({
    resolver: zodResolver(ApprovalCommentSchema),
    defaultValues: {
      comment: '',
    },
  });

  const handleIndividualApproval = async (action: 'approve' | 'reject') => {
    try {
      const formData = form.getValues();

      const approvalData: IndividualApprovalType = {
        id: itemId,
        action,
        comment: formData.comment,
        approvedById: 'current-user-id',
      };

      await onSubmit(approvalData);
      form.reset();
    } catch (error) {
      console.error('承認処理でエラーが発生しました:', error);
      throw error;
    }
  };

  return {
    form,
    handleIndividualApproval,
  };
};

// 一括承認用のフック
export const useBatchApproval = (onSubmit: (data: BatchApprovalType, selectedItemIds: string[]) => Promise<void>) => {
  const form = useForm<ApprovalCommentType>({
    resolver: zodResolver(ApprovalCommentSchema),
    defaultValues: {
      comment: '',
    },
  });

  const handleBatchApproval = async (action: 'approve' | 'reject', selectedItemIds: string[]) => {
    try {
      if (selectedItemIds.length === 0) {
        throw new Error('承認対象を選択してください');
      }

      const formData = form.getValues();

      const batchApprovalData: BatchApprovalType = {
        ids: selectedItemIds,
        action,
        comment: formData.comment,
        approvedById: 'current-user-id',
      };

      await onSubmit(batchApprovalData, selectedItemIds);
      form.reset();
    } catch (error) {
      console.error('一括承認処理でエラーが発生しました:', error);
      throw error;
    }
  };

  return {
    form,
    handleBatchApproval,
  };
};
