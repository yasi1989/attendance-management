'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MonthlyAttendanceApprovalType } from '../type/monthlyAttendanceApprovalType';
import { MonthlyExpenseApprovalType } from '../type/monthlyExpenseApprovalType';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import MonthlyAttendanceApprovalsTable from './MonthlyAttendanceApprovalsTable';
import MonthlyExpenseApprovalsTable from './MonthlyExpenseApprovalsTable';
import { DepartmentType } from '@/features/system-admin/users/type/departmentType';
import { Clock, DollarSign } from 'lucide-react';

type MonthlyApprovalFormProps = {
  status: 'Pending' | 'Approved';
  attendances: MonthlyAttendanceApprovalType[];
  expenses: MonthlyExpenseApprovalType[];
  myCompanyDepartments: DepartmentType[];
};

const MonthlyApprovalForm = ({ status, attendances, expenses, myCompanyDepartments }: MonthlyApprovalFormProps) => {
  const [activeTab, setActiveTab] = useState<string>('attendance');
  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="border-b bg-muted/20">
        <CardTitle className="text-xl">{status === 'Pending' ? '承認待ち一覧' : '承認履歴'}</CardTitle>
        <CardDescription>
          {status === 'Pending' ? '承認待ちの月次申請を確認・管理できます。' : '承認済みの月次申請を確認できます。'}
        </CardDescription>
      </CardHeader>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <CardContent className="pt-2">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="attendance" className="cursor-pointer">
              <Clock className="h-4 w-4" />
              勤怠承認
            </TabsTrigger>
            <TabsTrigger value="expense" className="cursor-pointer">
              <DollarSign className="h-4 w-4" />
              経費承認
            </TabsTrigger>
          </TabsList>

          <TabsContent value="attendance">
            <MonthlyAttendanceApprovalsTable status={status} attendances={attendances} departments={myCompanyDepartments} />
          </TabsContent>

          <TabsContent value="expense">
            <MonthlyExpenseApprovalsTable status={status} expenses={expenses} departments={myCompanyDepartments} />
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
};

export default MonthlyApprovalForm;
