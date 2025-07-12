import { Clock } from 'lucide-react';
import MonthlyAttendanceApprovalsTable from './MonthlyAttendanceApprovalsTable';
import { StatusType } from '@/types/statusType';
import { MonthlyAttendanceApprovalItem } from '../type/monthlyAttendanceApprovalType';
import { DepartmentType } from '@/features/system/users/type/departmentType';

type AttendanceApprovalsTabsProps = {
  status: StatusType;
  attendances: MonthlyAttendanceApprovalItem[];
  myCompanyDepartments: DepartmentType[];
};

const AttendanceApprovalsTabs = ({ status, attendances, myCompanyDepartments }: AttendanceApprovalsTabsProps) => {
  return (
    <>
      <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-3">
          <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <div>
            <h3 className="font-semibold text-blue-900 dark:text-blue-100">勤怠申請管理</h3>
            <p className="text-sm text-blue-700 dark:text-blue-300">従業員の勤怠データを確認し、承認処理を行います</p>
          </div>
        </div>
      </div>
      <div className="rounded-lg overflow-hidden">
        <MonthlyAttendanceApprovalsTable status={status} attendances={attendances} departments={myCompanyDepartments} />
      </div>
    </>
  );
};

export default AttendanceApprovalsTabs;
