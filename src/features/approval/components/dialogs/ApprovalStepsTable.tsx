'use client';

import { use } from 'react';
import { DataTable } from '@/components/table/DataTable';
import { Result } from '@/lib/result';
import { approvalStepsColumns } from '../../table/ApprovalStepsColumn';
import { ApprovalStepType } from '../../type/approvalStepType';

type ApprovalStepsTableProps = {
  stepsPromise: Promise<Result<ApprovalStepType[]>>;
};

const ApprovalStepsTable = ({ stepsPromise }: ApprovalStepsTableProps) => {
  const result = use(stepsPromise);
  if (!result.success) return <p className="text-red-500 text-sm">データ取得に失敗しました</p>;
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <DataTable columns={approvalStepsColumns} data={result.data} />
    </div>
  );
};

export default ApprovalStepsTable;
