import { departments, users } from '@/features/system-admin/users/const/mockData';
import { MonthlyApprovalsType } from '../type/monthlyApprovalsType';

const getUserWithDepartment = (userId: string) => {
  const user = users.find((u) => u.id === userId);
  const department = departments.find((d) => d.id === user?.departmentId);
  return user && department ? { ...user, department } : null;
};

export const sampleMonthlyApprovals: MonthlyApprovalsType = {
  attendances: [
    // PENDING - 2段階承認が必要（残業過多）
    {
      id: 'att-001',
      userId: 'u4a2b3c4-5d6e-789f-a1b2-c3d4e5f67893',
      user: getUserWithDepartment('u4a2b3c4-5d6e-789f-a1b2-c3d4e5f67893')!,
      year: '2025',
      month: '05',
      status: { id: 'status001', statusCode: 'Pending', statusName: '未承認', description: '承認待ち' },
      totalWorkDays: 22,
      actualWorkDays: 19,
      totalWorkHours: 168.5,
      regularHours: 152,
      overtimeHours: 16.5,
      categoryBreakdown: {
        WORK: { name: '出勤', count: 17 },
        PAID_LEAVE: { name: '有給', count: 1 },
        ABSENCE: { name: '欠勤', count: 1 },
        SPECIAL: { name: '特別', count: 2 },
      },
      submittedAt: '2025-05-31T17:30:00',
      issues: ['excessive_overtime'],
      approvalSteps: [
        {
          stepOrder: 1,
          approverId: 'u2a2b3c4-5d6e-789f-a1b2-c3d4e5f67891',
          approver: users.find((u) => u.id === 'u2a2b3c4-5d6e-789f-a1b2-c3d4e5f67891')!,
          status: 'Approved',
          statusName: '承認済み',
          approvedAt: new Date('2025-06-02T09:30:00'),
          comment: '内容確認済み。2次承認をお願いします。',
        },
        {
          stepOrder: 2,
          approverId: 'u1a2b3c4-5d6e-789f-a1b2-c3d4e5f67890',
          approver: users.find((u) => u.id === 'u1a2b3c4-5d6e-789f-a1b2-c3d4e5f67890')!,
          statusName: '承認待ち',
          status: 'Pending',
        },
      ],
    },
    // PENDING - 1段階承認
    {
      id: 'att-002',
      userId: 'u7a2b3c4-5d6e-789f-a1b2-c3d4e5f67896',
      user: getUserWithDepartment('u7a2b3c4-5d6e-789f-a1b2-c3d4e5f67896')!,
      year: '2025',
      month: '06',
      status: { id: 'status001', statusCode: 'Pending', statusName: '未承認', description: '承認待ち' },
      totalWorkDays: 22,
      actualWorkDays: 22,
      totalWorkHours: 184,
      regularHours: 176,
      overtimeHours: 8,
      categoryBreakdown: {
        WORK: { name: '出勤', count: 22 },
        PAID_LEAVE: { name: '有給', count: 0 },
        ABSENCE: { name: '欠勤', count: 0 },
        SPECIAL: { name: '特別', count: 0 },
      },
      submittedAt: '2025-06-30T18:15:00',
      issues: [],
      approvalSteps: [
        {
          stepOrder: 1,
          approverId: 'u5a2b3c4-5d6e-789f-a1b2-c3d4e5f67894',
          approver: users.find((u) => u.id === 'u5a2b3c4-5d6e-789f-a1b2-c3d4e5f67894')!,
          statusName: '承認待ち',
          status: 'Pending',
        },
      ],
    },
    // APPROVED - 承認済み
    {
      id: 'att-003',
      userId: 'u3a2b3c4-5d6e-789f-a1b2-c3d4e5f67892',
      user: getUserWithDepartment('u3a2b3c4-5d6e-789f-a1b2-c3d4e5f67892')!,
      year: '2025',
      month: '05',
      status: { id: 'status002', statusCode: 'Approved', statusName: '承認済み', description: '承認完了' },
      totalWorkDays: 22,
      actualWorkDays: 21,
      totalWorkHours: 168,
      regularHours: 168,
      overtimeHours: 0,
      categoryBreakdown: {
        WORK: { name: '出勤', count: 20 },
        PAID_LEAVE: { name: '有給', count: 1 },
        ABSENCE: { name: '欠勤', count: 0 },
        SPECIAL: { name: '特別', count: 1 },
      },
      submittedAt: '2025-05-31T17:00:00',
      issues: [],
      approvalSteps: [
        {
          stepOrder: 1,
          approverId: 'u2a2b3c4-5d6e-789f-a1b2-c3d4e5f67891',
          approver: users.find((u) => u.id === 'u2a2b3c4-5d6e-789f-a1b2-c3d4e5f67891')!,
          status: 'Approved',
          statusName: '承認済み',
          approvedAt: new Date('2025-06-02T09:30:00'),
          comment: '問題ありません。承認いたします。',
        },
      ],
    },
    // PENDING - 前月持越し
    {
      id: 'att-004',
      userId: 'u10a2b3c4-5d6e-789f-a1b2-c3d4e5f67899',
      user: getUserWithDepartment('u10a2b3c4-5d6e-789f-a1b2-c3d4e5f67899')!,
      year: '2025',
      month: '04',
      status: { id: 'status001', statusCode: 'Pending', statusName: '未承認', description: '承認待ち' },
      totalWorkDays: 22,
      actualWorkDays: 18,
      totalWorkHours: 144,
      regularHours: 144,
      overtimeHours: 0,
      categoryBreakdown: {
        WORK: { name: '出勤', count: 16 },
        PAID_LEAVE: { name: '有給', count: 2 },
        ABSENCE: { name: '欠勤', count: 2 },
        SPECIAL: { name: '特別', count: 2 },
      },
      submittedAt: '2025-04-30T16:45:00',
      issues: ['insufficient_hours'],
      approvalSteps: [
        {
          stepOrder: 1,
          approverId: 'u8a2b3c4-5d6e-789f-a1b2-c3d4e5f67897',
          approver: users.find((u) => u.id === 'u8a2b3c4-5d6e-789f-a1b2-c3d4e5f67897')!,
          status: 'Pending',
          statusName: '承認待ち',
        },
      ],
    },
  ],
  expenses: [
    // PENDING - 高額経費（2段階承認、1次承認済み）
    {
      id: 'exp-001',
      userId: 'u4a2b3c4-5d6e-789f-a1b2-c3d4e5f67893',
      user: getUserWithDepartment('u4a2b3c4-5d6e-789f-a1b2-c3d4e5f67893')!,
      year: '2025',
      month: '05',
      status: { id: 'status001', statusCode: 'Pending', statusName: '未承認', description: '承認待ち' },
      totalAmount: 45600,
      itemCount: 8,
      categoryBreakdown: {
        TRANSPORT: { name: '交通費', amount: 28900, count: 5 },
        GENERAL: { name: '一般経費', amount: 16700, count: 3 },
      },
      submittedAt: '2025-05-31T17:30:00',
      issues: ['high_amount'],
      approvalSteps: [
        {
          stepOrder: 1,
          approverId: 'u2a2b3c4-5d6e-789f-a1b2-c3d4e5f67891',
          approver: users.find((u) => u.id === 'u2a2b3c4-5d6e-789f-a1b2-c3d4e5f67891')!,
          status: 'Approved',
          statusName: '承認済み',
          approvedAt: new Date('2025-06-01T14:20:00'),
          comment: '内容確認済み。2次承認をお願いします。',
        },
        {
          stepOrder: 2,
          approverId: 'u1a2b3c4-5d6e-789f-a1b2-c3d4e5f67890',
          approver: users.find((u) => u.id === 'u1a2b3c4-5d6e-789f-a1b2-c3d4e5f67890')!,
          status: 'Pending',
          statusName: '承認待ち',
        },
      ],
    },
    // PENDING - 通常経費（1段階承認）
    {
      id: 'exp-002',
      userId: 'u7a2b3c4-5d6e-789f-a1b2-c3d4e5f67896',
      user: getUserWithDepartment('u7a2b3c4-5d6e-789f-a1b2-c3d4e5f67896')!,
      year: '2025',
      month: '06',
      status: { id: 'status001', statusCode: 'Pending', statusName: '未承認', description: '承認待ち' },
      totalAmount: 3240,
      itemCount: 2,
      categoryBreakdown: {
        TRANSPORT: { name: '交通費', amount: 3240, count: 2 },
      },
      submittedAt: '2025-06-30T18:15:00',
      issues: [],
      approvalSteps: [
        {
          stepOrder: 1,
          approverId: 'u5a2b3c4-5d6e-789f-a1b2-c3d4e5f67894',
          approver: users.find((u) => u.id === 'u5a2b3c4-5d6e-789f-a1b2-c3d4e5f67894')!,
          status: 'Pending',
          statusName: '承認待ち',
        },
      ],
    },
    // APPROVED - 承認済み経費
    {
      id: 'exp-003',
      userId: 'u6a2b3c4-5d6e-789f-a1b2-c3d4e5f67895',
      user: getUserWithDepartment('u6a2b3c4-5d6e-789f-a1b2-c3d4e5f67895')!,
      year: '2025',
      month: '05',
      status: { id: 'status002', statusCode: 'Approved', statusName: '承認済み', description: '承認完了' },
      totalAmount: 12800,
      itemCount: 4,
      categoryBreakdown: {
        TRANSPORT: { name: '交通費', amount: 8600, count: 3 },
        GENERAL: { name: '一般経費', amount: 4200, count: 1 },
      },
      submittedAt: '2025-05-31T16:20:00',
      issues: [],
      approvalSteps: [
        {
          stepOrder: 1,
          approverId: 'u5a2b3c4-5d6e-789f-a1b2-c3d4e5f67894',
          approver: users.find((u) => u.id === 'u5a2b3c4-5d6e-789f-a1b2-c3d4e5f67894')!,
          status: 'Approved',
          statusName: '承認済み',
          approvedAt: new Date('2025-06-02T11:45:00'),
          comment: '承認いたします。',
        },
      ],
    },
  ],
  myCompanyDepartments: departments,
};
