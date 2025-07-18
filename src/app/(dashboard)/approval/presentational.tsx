'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import { DepartmentType } from '@/features/system/users/type/departmentType';
import { CheckCircle, Clock, DollarSign } from 'lucide-react';
import { StatusType } from '@/types/statusType';
import { Badge } from '@/components/ui/badge';
import CommonPageHeader from '@/components/layout/CommonPageHeader';
import { MonthlyAttendanceApprovalItem } from '@/features/approval/type/monthlyAttendanceApprovalType';
import { MonthlyExpenseApprovalItem } from '@/features/approval/type/monthlyExpenseApprovalType';
import AttendanceApprovalsTabs from '@/features/approval/components/AttendanceApprovalsTabs';
import ExpenseApprovalsTabs from '@/features/approval/components/ExpenseApprovalsTabs';
import ApprovalFilterSelector from '@/features/approval/components/ApprovalFilterSelector';

type ApprovalPresentationalProps = {
  attendances: MonthlyAttendanceApprovalItem[];
  expenses: MonthlyExpenseApprovalItem[];
  myCompanyDepartments: DepartmentType[];
  currentYear: number;
  currentMonth: number;
  currentStatus: StatusType;
};

const ApprovalPresentational = ({
  attendances,
  expenses,
  myCompanyDepartments,
  currentYear,
  currentMonth,
  currentStatus,
}: ApprovalPresentationalProps) => {
  const [activeTab, setActiveTab] = useState<string>('attendance');

  return (
    <Card className="shadow-2xl border-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl ring-1 ring-slate-200/50 dark:ring-slate-800/50 overflow-hidden">
      <CommonPageHeader
        title="申請管理"
        description="承認プロセスの管理と進捗状況の確認"
        icon={<CheckCircle className="w-6 h-6 text-white" />}
      />

      <CardContent className="bg-gradient-to-b from-white/80 to-slate-50/80 dark:from-slate-900/80 dark:to-slate-800/80 backdrop-blur-sm border-t border-slate-200/30 dark:border-slate-700/30 p-6 space-y-6">
        <ApprovalFilterSelector currentYear={currentYear} currentMonth={currentMonth} currentStatus={currentStatus} />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="attendance">
              <Clock className="h-4 w-4" />
              <span className="font-medium">勤怠承認</span>
              {attendances.length > 0 && (
                <Badge variant="destructive" className="ml-2 px-2 py-0.5 text-xs">
                  {attendances.length}
                </Badge>
              )}
            </TabsTrigger>

            <TabsTrigger value="expense">
              <DollarSign className="h-4 w-4" />
              <span className="font-medium">経費承認</span>
              {expenses.length > 0 && (
                <Badge variant="destructive" className="ml-2 px-2 py-0.5 text-xs">
                  {expenses.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="attendance" className="mt-6">
            <AttendanceApprovalsTabs attendances={attendances} myCompanyDepartments={myCompanyDepartments} />
          </TabsContent>

          <TabsContent value="expense" className="mt-6">
            <ExpenseApprovalsTabs expenses={expenses} myCompanyDepartments={myCompanyDepartments} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ApprovalPresentational;
