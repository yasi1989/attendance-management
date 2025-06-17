import { departments, users } from '@/features/system-admin/users/const/mockData';
import { MonthlyApprovalsType } from '../type/monthlyApprovalsType';

const getUserWithDepartment = (userId: string) => {
  const user = users.find((u) => u.id === userId);
  const department = departments.find((d) => d.id === user?.departmentId);
  return user && department ? { ...user, department } : null;
};

const attendanceCategories: AttendanceCategoryType[] = [
  { id: 'WORK', name: '出勤', createdAt: new Date(), updatedAt: new Date() },
  { id: 'PAID_LEAVE', name: '有給休暇', createdAt: new Date(), updatedAt: new Date() },
  { id: 'ABSENCE', name: '欠勤', createdAt: new Date(), updatedAt: new Date() },
  { id: 'SPECIAL', name: '特別休暇', createdAt: new Date(), updatedAt: new Date() },
];

const expenseCategories: ExpenseCategoryType[] = [
  { id: 'TRANSPORT', name: '交通費', createdAt: new Date(), updatedAt: new Date() },
  { id: 'GENERAL', name: '一般経費', createdAt: new Date(), updatedAt: new Date() },
];

const statuses: StatusType[] = [
  { id: 'status001', statusCode: 'PENDING', statusName: '未承認', description: '承認待ち' },
  { id: 'status002', statusCode: 'APPROVED', statusName: '承認済み', description: '承認済み' },
  { id: 'status003', statusCode: 'REJECTED', statusName: '却下', description: '却下' },
];

export const sampleMonthlyApprovals: MonthlyApprovalsType = {
  attendances: [
    {
      id: 'a1a2b3c4-5d6e-789f-a1b2-c3d4e5f67890',
      userId: 'u4a2b3c4-5d6e-789f-a1b2-c3d4e5f67893',
      user: getUserWithDepartment('u4a2b3c4-5d6e-789f-a1b2-c3d4e5f67893')!,
      month: '2025-05',
      attendanceCategories: [
        { id: 'WORK', name: '出勤', createdAt: new Date(), updatedAt: new Date() },
        { id: 'PAID_LEAVE', name: '有給休暇', createdAt: new Date(), updatedAt: new Date() },
        { id: 'ABSENCE', name: '欠勤', createdAt: new Date(), updatedAt: new Date() },
        { id: 'SPECIAL', name: '特別休暇', createdAt: new Date(), updatedAt: new Date() },
      ],
      status: { id: 'status001', statusCode: 'PENDING', statusName: '未承認', description: '承認待ち' },
      totalWorkDays: 21,
      actualWorkDays: 19,
      totalWorkHours: 168.5,
      regularHours: 152,
      overtimeHours: 16.5,
      categoryBreakdown: {
        WORK: 17,
        PAID_LEAVE: 1,
        ABSENCE: 1,
        SPECIAL: 2,
      },
      submittedAt: '2025-05-31T17:30:00',
      issues: ['excessive_overtime'],
      approvalOrder: 1,
      totalSteps: 2,
    },
    {
      id: 'a1a2b3c4-5d6e-789f-a1b2-c3d4e5f67891',
      userId: 'u7a2b3c4-5d6e-789f-a1b2-c3d4e5f67896',
      user: getUserWithDepartment('u7a2b3c4-5d6e-789f-a1b2-c3d4e5f67896')!,
      month: '2025-06', // 当月
      attendanceCategories: [
        { id: 'WORK', name: '出勤', createdAt: new Date(), updatedAt: new Date() },
        { id: 'PAID_LEAVE', name: '有給休暇', createdAt: new Date(), updatedAt: new Date() },
        { id: 'ABSENCE', name: '欠勤', createdAt: new Date(), updatedAt: new Date() },
        { id: 'SPECIAL', name: '特別休暇', createdAt: new Date(), updatedAt: new Date() },
      ],
      status: { id: 'status001', statusCode: 'PENDING', statusName: '未承認', description: '承認待ち' },
      totalWorkDays: 22,
      actualWorkDays: 22,
      totalWorkHours: 184,
      regularHours: 176,
      overtimeHours: 8,
      categoryBreakdown: {
        WORK: 22,
        PAID_LEAVE: 0,
        ABSENCE: 0,
        SPECIAL: 0,
      },
      submittedAt: '2025-06-30T18:15:00',
      issues: [],
      approvalOrder: 1,
      totalSteps: 1,
    },
    {
      id: 'a1a2b3c4-5d6e-789f-a1b2-c3d4e5f67892',
      userId: 'u10a2b3c4-5d6e-789f-a1b2-c3d4e5f67899',
      user: getUserWithDepartment('u10a2b3c4-5d6e-789f-a1b2-c3d4e5f67899')!,
      month: '2025-04', // さらに前月持越し
      attendanceCategories: [
        { id: 'WORK', name: '出勤', createdAt: new Date(), updatedAt: new Date() },
        { id: 'PAID_LEAVE', name: '有給休暇', createdAt: new Date(), updatedAt: new Date() },
        { id: 'ABSENCE', name: '欠勤', createdAt: new Date(), updatedAt: new Date() },
        { id: 'SPECIAL', name: '特別休暇', createdAt: new Date(), updatedAt: new Date() },
      ],
      status: { id: 'status001', statusCode: 'PENDING', statusName: '未承認', description: '承認待ち' },
      totalWorkDays: 22,
      actualWorkDays: 18,
      totalWorkHours: 144,
      regularHours: 144,
      overtimeHours: 0,
      categoryBreakdown: {
        WORK: 16,
        PAID_LEAVE: 2,
        ABSENCE: 2,
        SPECIAL: 2,
      },
      submittedAt: '2025-04-30T16:45:00',
      issues: ['insufficient_hours'],
      approvalOrder: 1,
      totalSteps: 2,
    },
    {
      id: 'a1a2b3c4-5d6e-789f-a1b2-c3d4e5f67893',
      userId: 'u3a2b3c4-5d6e-789f-a1b2-c3d4e5f67892',
      user: getUserWithDepartment('u3a2b3c4-5d6e-789f-a1b2-c3d4e5f67892')!,
      month: '2025-06',
      attendanceCategories: [
        { id: 'WORK', name: '出勤', createdAt: new Date(), updatedAt: new Date() },
        { id: 'PAID_LEAVE', name: '有給休暇', createdAt: new Date(), updatedAt: new Date() },
        { id: 'ABSENCE', name: '欠勤', createdAt: new Date(), updatedAt: new Date() },
        { id: 'SPECIAL', name: '特別休暇', createdAt: new Date(), updatedAt: new Date() },
      ],
      status: { id: 'status001', statusCode: 'PENDING', statusName: '未承認', description: '承認待ち' },
      totalWorkDays: 22,
      actualWorkDays: 21,
      totalWorkHours: 168,
      regularHours: 168,
      overtimeHours: 0,
      categoryBreakdown: {
        WORK: 20,
        PAID_LEAVE: 1,
        ABSENCE: 0,
        SPECIAL: 1,
      },
      submittedAt: '2025-06-30T17:00:00',
      issues: [],
      approvalOrder: 1,
      totalSteps: 1,
    },
  ],
  expenses: [
    {
      id: 'a1a2b3c4-5d6e-789f-a1b2-c3d4e5f67894',
      userId: 'u4a2b3c4-5d6e-789f-a1b2-c3d4e5f67893',
      user: getUserWithDepartment('u4a2b3c4-5d6e-789f-a1b2-c3d4e5f67893')!,
      month: '2025-05',
      expenseRecords: [],
      expenseCategories: [
        { id: 'TRANSPORT', name: '交通費', createdAt: new Date(), updatedAt: new Date() },
        { id: 'GENERAL', name: '一般経費', createdAt: new Date(), updatedAt: new Date() },
      ],
      routeInfos: [],
      status: { id: 'status001', statusCode: 'PENDING', statusName: '未承認', description: '承認待ち' },
      totalAmount: 45600,
      itemCount: 8,
      categoryBreakdown: {
        TRANSPORT: { amount: 28900, count: 5 },
        GENERAL: { amount: 16700, count: 3 },
      },
      submittedAt: '2025-05-31T17:30:00',
      issues: ['high_amount'],
      approvalOrder: 2,
      totalSteps: 3,
    },
    {
      id: 'a1a2b3c4-5d6e-789f-a1b2-c3d4e5f67895',
      userId: 'u7a2b3c4-5d6e-789f-a1b2-c3d4e5f67896',
      user: getUserWithDepartment('u7a2b3c4-5d6e-789f-a1b2-c3d4e5f67896')!,
      month: '2025-06',
      expenseRecords: [],
      expenseCategories: [
        { id: 'TRANSPORT', name: '交通費', createdAt: new Date(), updatedAt: new Date() },
        { id: 'GENERAL', name: '一般経費', createdAt: new Date(), updatedAt: new Date() },
      ],
      routeInfos: [],
      status: { id: 'status001', statusCode: 'PENDING', statusName: '未承認', description: '承認待ち' },
      totalAmount: 3240,
      itemCount: 2,
      categoryBreakdown: {
        TRANSPORT: { amount: 3240, count: 2 },
      },
      submittedAt: '2025-06-30T18:15:00',
      issues: [],
      approvalOrder: 1,
      totalSteps: 1,
    },
  ],
};
