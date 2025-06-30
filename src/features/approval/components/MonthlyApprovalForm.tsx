'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MonthlyAttendanceApprovalType } from '../type/monthlyAttendanceApprovalType';
import { MonthlyExpenseApprovalType } from '../type/monthlyExpenseApprovalType';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import MonthlyAttendanceApprovalsTable from './MonthlyAttendanceApprovalsTable';
import MonthlyExpenseApprovalsTable from './MonthlyExpenseApprovalsTable';
import { DepartmentType } from '@/features/system/users/type/departmentType';
import { AlertCircle, CheckCircle2, Clock, DollarSign } from 'lucide-react';
import { StatusType } from '@/types/statusType';
import { Badge } from '@/components/ui/badge';

type MonthlyApprovalFormProps = {
  status: StatusType;
  attendances: MonthlyAttendanceApprovalType[];
  expenses: MonthlyExpenseApprovalType[];
  myCompanyDepartments: DepartmentType[];
};

const MonthlyApprovalForm = ({ status, attendances, expenses, myCompanyDepartments }: MonthlyApprovalFormProps) => {
  const [activeTab, setActiveTab] = useState<string>('attendance');

  return (
    <div className="space-y-6">
      <Card className="border-gray-200 dark:border-gray-800 shadow-sm">
        <CardHeader className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
          <div>
            <CardTitle className="text-xl text-gray-900 dark:text-gray-100">申請管理</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              承認プロセスの管理と進捗状況の確認
            </CardDescription>
          </div>
          {renderStatusBadge(status)}
        </CardHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <CardContent className="pt-6">
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
              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <div>
                    <h3 className="font-semibold text-blue-900 dark:text-blue-100">勤怠申請管理</h3>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      従業員の勤怠データを確認し、承認処理を行います
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden">
                <MonthlyAttendanceApprovalsTable
                  status={status}
                  attendances={attendances}
                  departments={myCompanyDepartments}
                />
              </div>
            </TabsContent>

            <TabsContent value="expense" className="mt-6">
              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-3">
                  <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <div>
                    <h3 className="font-semibold text-green-900 dark:text-green-100">経費申請管理</h3>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      経費申請の詳細を確認し、予算に応じた承認処理を行います
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden">
                <MonthlyExpenseApprovalsTable status={status} expenses={expenses} departments={myCompanyDepartments} />
              </div>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
};

const renderStatusBadge = (status: StatusType) => {
  switch (status) {
    case 'Pending':
      return (
        <Badge
          variant="secondary"
          className="bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800 px-3 py-1"
        >
          <AlertCircle className="h-3 w-3 mr-1" />
          承認待ち
        </Badge>
      );
    case 'Approved':
      return (
        <Badge
          variant="secondary"
          className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800 px-3 py-1"
        >
          <CheckCircle2 className="h-3 w-3 mr-1" />
          承認済み
        </Badge>
      );
    case 'Rejected':
      return (
        <Badge
          variant="secondary"
          className="bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800 px-3 py-1"
        >
          <AlertCircle className="h-3 w-3 mr-1" />
          承認拒否
        </Badge>
      );
    default:
      return null;
  }
};

export default MonthlyApprovalForm;
