import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Clock, DollarSign } from 'lucide-react';
import AttendanceApprovalsTabs from './AttendanceApprovalsTabs';
import ExpenseApprovalsTabs from './ExpenseApprovalsTabs';
import { MonthlyAttendanceApprovalItem } from '../type/monthlyAttendanceApprovalType';
import { MonthlyExpenseApprovalItem } from '../type/monthlyExpenseApprovalType';
import { DepartmentType } from '@/features/system/users/type/departmentType';
import { useState } from 'react';
import { REQUEST_CATEGORIES } from '@/consts/requestsCategory';

type ApprovalExpenseItemsTabProps = {
  attendances: MonthlyAttendanceApprovalItem[];
  expenses: MonthlyExpenseApprovalItem[];
  myCompanyDepartments: DepartmentType[];
};

const ApprovalExpenseItemsTab = ({ attendances, expenses, myCompanyDepartments }: ApprovalExpenseItemsTabProps) => {
  const [activeTab, setActiveTab] = useState<string>(REQUEST_CATEGORIES.ATTENDANCE.value);
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="w-full">
        <TabsTrigger value={REQUEST_CATEGORIES.ATTENDANCE.value}>
          <Clock className="h-4 w-4" />
          <span className="font-medium">{REQUEST_CATEGORIES.ATTENDANCE.label}</span>
          {attendances.length > 0 && (
            <Badge variant="destructive" className="ml-2 px-2 py-0.5 text-xs">
              {attendances.length}
            </Badge>
          )}
        </TabsTrigger>

        <TabsTrigger value={REQUEST_CATEGORIES.EXPENSE.value}>
          <DollarSign className="h-4 w-4" />
          <span className="font-medium">{REQUEST_CATEGORIES.EXPENSE.label}</span>
          {expenses.length > 0 && (
            <Badge variant="destructive" className="ml-2 px-2 py-0.5 text-xs">
              {expenses.length}
            </Badge>
          )}
        </TabsTrigger>
      </TabsList>

      <TabsContent value={REQUEST_CATEGORIES.ATTENDANCE.value} className="mt-6">
        <AttendanceApprovalsTabs attendances={attendances} myCompanyDepartments={myCompanyDepartments} />
      </TabsContent>

      <TabsContent value={REQUEST_CATEGORIES.EXPENSE.value} className="mt-6">
        <ExpenseApprovalsTabs expenses={expenses} myCompanyDepartments={myCompanyDepartments} />
      </TabsContent>
    </Tabs>
  );
};

export default ApprovalExpenseItemsTab;
