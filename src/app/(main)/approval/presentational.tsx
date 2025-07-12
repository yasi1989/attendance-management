'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import { DepartmentType } from '@/features/system/users/type/departmentType';
import { Clock, DollarSign } from 'lucide-react';
import { StatusType } from '@/types/statusType';
import { Badge } from '@/components/ui/badge';
import CommonPageHeader from '@/components/CommonPageHeader';
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
    <div className="space-y-6">
      <Card className="border-gray-200 dark:border-gray-800 shadow-sm">
        <CommonPageHeader title="申請管理" description="承認プロセスの管理と進捗状況の確認" />

        <CardContent className="space-y-4">
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
              <AttendanceApprovalsTabs
                status={currentStatus}
                attendances={attendances}
                myCompanyDepartments={myCompanyDepartments}
              />
            </TabsContent>

            <TabsContent value="expense" className="mt-6">
              <ExpenseApprovalsTabs
                status={currentStatus}
                expenses={expenses}
                myCompanyDepartments={myCompanyDepartments}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApprovalPresentational;
