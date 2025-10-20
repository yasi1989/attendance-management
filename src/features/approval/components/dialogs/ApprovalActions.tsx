import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle } from 'lucide-react';
import InputTextFormField from '@/components/form/InputTextFormField';
import { UseFormReturn } from 'react-hook-form';
import { ApprovalCommentType, IndividualApprovalType } from '../../lib/formSchema';
import { STATUS } from '@/consts/status';

interface ApprovalActionsProps {
  form: UseFormReturn<ApprovalCommentType>;
  handleIndividualApproval: (approvalStatus: IndividualApprovalType['action']) => void;
  isSubmitted: boolean;
}

const ApprovalActions = ({ form, handleIndividualApproval, isSubmitted }: ApprovalActionsProps) => {
  return (
    <div className="flex flex-col space-y-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
      <InputTextFormField
        label="承認コメント"
        name="comment"
        form={form}
        placeholder="承認理由やコメントを入力..."
        className="mt-1 min-h-[80px] resize-none"
        maxLength={500}
      />

      <div className="flex flex-col md:flex-row gap-2 pt-2">
        <Button
          type="button"
          onClick={() => handleIndividualApproval(STATUS.APPROVED.value)}
          className="bg-green-600 hover:bg-green-700 flex-1 md:flex-none"
          disabled={isSubmitted}
        >
          <CheckCircle className="h-4 w-4 mr-1" />
          承認する
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => handleIndividualApproval(STATUS.REJECTED.value)}
          className="text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex-1 md:flex-none"
          disabled={isSubmitted}
        >
          <XCircle className="h-4 w-4 mr-1" />
          却下する
        </Button>
      </div>
    </div>
  );
};

export default ApprovalActions;
