import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle } from 'lucide-react';
import InputTextFormField from '@/components/InputTextFormField';
import { UseFormReturn } from 'react-hook-form';
import { ApprovalCommentType } from '../../lib/formSchema';
import { ActionStatusType } from '../../type/actionStatusType';

interface ApprovalFooterProps {
  form: UseFormReturn<ApprovalCommentType>;
  handleIndividualApproval: (approvalStatus: ActionStatusType) => void;
  isPending: boolean;
}

const ApprovalFooter = ({ form, handleIndividualApproval, isPending }: ApprovalFooterProps) => {
  return (
    <div className="flex flex-col space-y-6">
      <InputTextFormField
        label="承認コメント"
        name="comment"
        form={form}
        placeholder="承認理由やコメントを入力..."
        className="mt-1 min-h-[80px] resize-none"
        maxLength={500}
      />

      <div className="flex gap-2 pt-2">
        <Button
          onClick={() => handleIndividualApproval('Approve')}
          className="bg-green-600 hover:bg-green-700"
          disabled={isPending}
        >
          <CheckCircle className="h-4 w-4 mr-1" />
          承認する
        </Button>
        <Button
          variant="outline"
          onClick={() => handleIndividualApproval('Reject')}
          className="text-red-600 border-red-600 hover:bg-red-50"
          disabled={isPending}
        >
          <XCircle className="h-4 w-4 mr-1" />
          却下する
        </Button>
      </div>
    </div>
  );
};

export default ApprovalFooter;
