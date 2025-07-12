'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { DepartmentType } from '@/features/system/users/type/departmentType';
import { Clock, DollarSign, CalendarDays } from 'lucide-react';
import { StatusType } from '@/types/statusType';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import CommonPageHeader from '@/components/CommonPageHeader';
import { MonthlyAttendanceApprovalItem } from '@/features/approval/type/monthlyAttendanceApprovalType';
import { MonthlyExpenseApprovalItem } from '@/features/approval/type/monthlyExpenseApprovalType';
import AttendanceApprovalsTabs from '@/features/approval/components/AttendanceApprovalsTabs';
import ExpenseApprovalsTabs from '@/features/approval/components/ExpenseApprovalsTabs';

type ApprovalPresentationalProps = {
  status: StatusType;
  attendances: MonthlyAttendanceApprovalItem[];
  expenses: MonthlyExpenseApprovalItem[];
  myCompanyDepartments: DepartmentType[];
  currentYear: number;
  currentMonth: number;
  currentStatus: string;
};

const ApprovalPresentational = ({
  status,
  attendances,
  expenses,
  myCompanyDepartments,
  currentYear,
  currentMonth,
  currentStatus,
}: ApprovalPresentationalProps) => {
  const [activeTab, setActiveTab] = useState<string>('attendance');

  // 年の選択肢を生成（現在年から前後3年）
  const generateYearOptions = () => {
    const years = [];
    const baseYear = new Date().getFullYear();
    for (let i = baseYear - 3; i <= baseYear + 3; i++) {
      years.push(i);
    }
    return years;
  };

  // 月の選択肢
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  // 状態の選択肢
  const statusOptions = [
    { value: 'all', label: 'すべて' },
    { value: 'pending', label: '承認待ち' },
    { value: 'approved', label: '承認済み' },
    { value: 'rejected', label: '却下' },
  ];

  return (
    <div className="space-y-6">
      <Card className="border-gray-200 dark:border-gray-800 shadow-sm">
        <CommonPageHeader title="申請管理" description="承認プロセスの管理と進捗状況の確認" />

        <CardContent className="space-y-4">
          {/* フィルター部分 */}
          <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-lg border border-blue-100 dark:border-gray-600">
            <div className="flex items-center space-x-2">
              <CalendarDays className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-200">表示条件:</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-200">年:</Label>
              <Select defaultValue={currentYear.toString()}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {generateYearOptions().map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}年
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-200">月:</Label>
              <Select defaultValue={currentMonth.toString()}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month) => (
                    <SelectItem key={month} value={month.toString()}>
                      {month}月
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-200">状態:</Label>
              <Select defaultValue={currentStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="text-sm text-gray-600 dark:text-gray-300">
              勤怠: {attendances.length}件 / 経費: {expenses.length}件
            </div>
          </div>

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
                status={status}
                attendances={attendances}
                myCompanyDepartments={myCompanyDepartments}
              />
            </TabsContent>

            <TabsContent value="expense" className="mt-6">
              <ExpenseApprovalsTabs status={status} expenses={expenses} myCompanyDepartments={myCompanyDepartments} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApprovalPresentational;