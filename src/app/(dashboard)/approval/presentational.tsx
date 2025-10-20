'use client';

import { Card, CardContent } from '@/components/ui/card';
import { DepartmentType } from '@/features/system/users/type/departmentType';
import { CheckCircle } from 'lucide-react';
import { StatusTypeWithAll } from '@/types/statusType';
import CommonPageHeader from '@/components/layout/CommonPageHeader';
import { MonthlyAttendanceApprovalItem } from '@/features/approval/type/monthlyAttendanceApprovalType';
import { MonthlyExpenseApprovalItem } from '@/features/approval/type/monthlyExpenseApprovalType';
import ApprovalFilterSelector from '@/features/approval/components/ApprovalFilterSelector';
import ApprovalExpenseItemsTab from '@/features/approval/components/ApprovalExpenseItemsTab';

type ApprovalPresentationalProps = {
  attendances: MonthlyAttendanceApprovalItem[];
  expenses: MonthlyExpenseApprovalItem[];
  myCompanyDepartments: DepartmentType[];
  currentYear: number;
  currentMonth: number;
  currentStatus: StatusTypeWithAll;
};

const ApprovalPresentational = ({
  attendances,
  expenses,
  myCompanyDepartments,
  currentYear,
  currentMonth,
  currentStatus,
}: ApprovalPresentationalProps) => {

  return (
    <Card className="shadow-2xl border-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl ring-1 ring-slate-200/50 dark:ring-slate-800/50 overflow-hidden">
      <CommonPageHeader
        title="申請管理"
        description="承認プロセスの管理と進捗状況の確認"
        icon={<CheckCircle className="w-6 h-6 text-white" />}
      />

      <CardContent className="bg-gradient-to-b from-white/80 to-slate-50/80 dark:from-slate-900/80 dark:to-slate-800/80 backdrop-blur-sm border-t border-slate-200/30 dark:border-slate-700/30 p-6 space-y-6">
        <ApprovalFilterSelector currentYear={currentYear} currentMonth={currentMonth} currentStatus={currentStatus} />
        <ApprovalExpenseItemsTab
          attendances={attendances}
          expenses={expenses}
          myCompanyDepartments={myCompanyDepartments}
        />
      </CardContent>
    </Card>
  );
};

export default ApprovalPresentational;
