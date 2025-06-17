'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import {
  Clock,
  User,
  Calendar,
  DollarSign,
  MapPin,
  FileText,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Filter,
  Search,
  Download,
  Users,
  TrendingUp,
} from 'lucide-react';

// 既存の型定義を使用
type AttendanceType = {
  id: string;
  userId: string;
  workDate: Date;
  startTime?: number;
  endTime?: number;
  breakTime?: number;
  attendanceCategoryId: string;
  currentStatusId: string;
  currentApproverId?: string;
  createdAt: Date;
  updatedAt: Date;
};

type AttendanceCategoryType = {
  id: string; // WORK, PAID_LEAVE, ABSENCE, SPECIAL
  name: string; // 出勤, 有給休暇, 欠勤, 特別休暇
  createdAt: Date;
  updatedAt: Date;
};

type CompanyType = {
  id: string;
  name: string;
  domain: string;
  createdAt: Date;
};

type DepartmentType = {
  id: string;
  companyId: string;
  departmentName: string;
  parentDepartmentId: string;
  managerUserId?: string;
  createdAt: Date;
  updatedAt: Date;
};

type ExpenseCategoryType = {
  id: string; // 交通費, 一般経費
  name: string; // TRANSPORT, GENERAL
  createdAt: Date;
  updatedAt: Date;
};

type ExpenseType = {
  id: string;
  userId: string;
  requestDate: Date;
  expenseCategoryId: string;
  amount: number;
  description: string;
  statusId: string;
  approvalId?: string;
  receiptUrl?: string;
};

type RouteInfoType = {
  id: string;
  expenseRequestId: string;
  routeDetails: { from: string; to: string; fare: number }[];
};

type HolidayType = {
  id: string;
  name: string;
  holidayDate: Date;
  companyId: string;
  createdAt: Date;
};

type RoleType = {
  id: string;
  roleCode: string; // SYSTEM_ADMIN, COMPANY_ADMIN, DEPUTY_MANAGER, GENERAL_USER, PERSONAL_USER
  roleName: string; // システム管理者, 会社管理者, 代理管理者, 一般利用者, 個人利用者
  isPersonalRole: boolean;
  isSystemRole: boolean;
  createdAt: Date;
};

type StatusType = {
  id: string;
  statusCode: string; // PENDING, APPROVED, REJECTED
  statusName: string; // 未承認, 承認済み, 却下
  description?: string;
};

type UserType = {
  id: string;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  companyId?: string;
  departmentId?: string;
  roleId: string;
  createdAt: Date;
  updatedAt: Date;
};

// 月次承認用の拡張型（既存型を組み合わせて作成）
type MonthlyAttendanceApproval = {
  id: string;
  userId: string;
  user: UserType & {
    department: DepartmentType;
  };
  month: string;
  attendanceRecords: AttendanceType[];
  attendanceCategories: AttendanceCategoryType[];
  status: StatusType;
  // 計算フィールド
  totalWorkDays: number;
  actualWorkDays: number;
  totalWorkHours: number;
  regularHours: number;
  overtimeHours: number;
  categoryBreakdown: Record<string, number>; // カテゴリID -> 日数
  submittedAt: string;
  issues: string[];
  approvalOrder: number;
  totalSteps: number;
};

type MonthlyExpenseApproval = {
  id: string;
  userId: string;
  user: UserType & {
    department: DepartmentType;
  };
  month: string;
  expenseRecords: ExpenseType[];
  expenseCategories: ExpenseCategoryType[];
  routeInfos: RouteInfoType[];
  status: StatusType;
  // 計算フィールド
  totalAmount: number;
  itemCount: number;
  categoryBreakdown: Record<string, { amount: number; count: number }>; // カテゴリID -> 集計
  submittedAt: string;
  issues: string[];
  approvalOrder: number;
  totalSteps: number;
};

type SampleMonthlyApprovals = {
  attendance: MonthlyAttendanceApproval[];
  expense: MonthlyExpenseApproval[];
};

// 既存の型定義を使用したサンプルデータ
const sampleMonthlyApprovals: SampleMonthlyApprovals = {
  attendance: [
    {
      id: '1',
      userId: 'user001',
      user: {
        id: 'user001',
        email: 'tanaka@company.com',
        passwordHash: 'hash1',
        firstName: '太郎',
        lastName: '田中',
        companyId: 'company001',
        departmentId: 'dept001',
        roleId: 'role001',
        createdAt: new Date('2025-01-01'),
        updatedAt: new Date('2025-01-01'),
        department: {
          id: 'dept001',
          companyId: 'company001',
          departmentName: '営業部',
          parentDepartmentId: 'parent001',
          managerUserId: 'manager001',
          createdAt: new Date('2025-01-01'),
          updatedAt: new Date('2025-01-01'),
        },
      },
      month: '2025-06',
      attendanceRecords: [], // 実際にはAttendanceType[]が入る
      attendanceCategories: [
        { id: 'WORK', name: '出勤', createdAt: new Date(), updatedAt: new Date() },
        { id: 'PAID_LEAVE', name: '有給休暇', createdAt: new Date(), updatedAt: new Date() },
        { id: 'ABSENCE', name: '欠勤', createdAt: new Date(), updatedAt: new Date() },
        { id: 'SPECIAL', name: '特別休暇', createdAt: new Date(), updatedAt: new Date() },
      ],
      status: { id: 'status001', statusCode: 'PENDING', statusName: '未承認', description: '承認待ち' },
      totalWorkDays: 22,
      actualWorkDays: 20,
      totalWorkHours: 176.5,
      regularHours: 160,
      overtimeHours: 16.5,
      categoryBreakdown: {
        WORK: 18,
        PAID_LEAVE: 1,
        ABSENCE: 1,
        SPECIAL: 2,
      },
      submittedAt: '2025-06-30T17:30:00',
      issues: ['excessive_overtime'],
      approvalOrder: 1,
      totalSteps: 2,
    },
    {
      id: '2',
      userId: 'user002',
      user: {
        id: 'user002',
        email: 'sato@company.com',
        passwordHash: 'hash2',
        firstName: '花子',
        lastName: '佐藤',
        companyId: 'company001',
        departmentId: 'dept002',
        roleId: 'role001',
        createdAt: new Date('2025-01-01'),
        updatedAt: new Date('2025-01-01'),
        department: {
          id: 'dept002',
          companyId: 'company001',
          departmentName: '開発部',
          parentDepartmentId: 'parent001',
          managerUserId: 'manager002',
          createdAt: new Date('2025-01-01'),
          updatedAt: new Date('2025-01-01'),
        },
      },
      month: '2025-06',
      attendanceRecords: [],
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
      id: '3',
      userId: 'user003',
      user: {
        id: 'user003',
        email: 'suzuki@company.com',
        passwordHash: 'hash3',
        firstName: '一郎',
        lastName: '鈴木',
        companyId: 'company001',
        departmentId: 'dept001',
        roleId: 'role001',
        createdAt: new Date('2025-01-01'),
        updatedAt: new Date('2025-01-01'),
        department: {
          id: 'dept001',
          companyId: 'company001',
          departmentName: '営業部',
          parentDepartmentId: 'parent001',
          managerUserId: 'manager001',
          createdAt: new Date('2025-01-01'),
          updatedAt: new Date('2025-01-01'),
        },
      },
      month: '2025-06',
      attendanceRecords: [],
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
      submittedAt: '2025-06-30T16:45:00',
      issues: ['insufficient_hours'],
      approvalOrder: 1,
      totalSteps: 2,
    },
    {
      id: '4',
      userId: 'user004',
      user: {
        id: 'user004',
        email: 'takahashi@company.com',
        passwordHash: 'hash4',
        firstName: '美咲',
        lastName: '高橋',
        companyId: 'company001',
        departmentId: 'dept003',
        roleId: 'role001',
        createdAt: new Date('2025-01-01'),
        updatedAt: new Date('2025-01-01'),
        department: {
          id: 'dept003',
          companyId: 'company001',
          departmentName: '総務部',
          parentDepartmentId: 'parent001',
          managerUserId: 'manager003',
          createdAt: new Date('2025-01-01'),
          updatedAt: new Date('2025-01-01'),
        },
      },
      month: '2025-06',
      attendanceRecords: [],
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
  expense: [
    {
      id: '5',
      userId: 'user001',
      user: {
        id: 'user001',
        email: 'tanaka@company.com',
        passwordHash: 'hash1',
        firstName: '太郎',
        lastName: '田中',
        companyId: 'company001',
        departmentId: 'dept001',
        roleId: 'role001',
        createdAt: new Date('2025-01-01'),
        updatedAt: new Date('2025-01-01'),
        department: {
          id: 'dept001',
          companyId: 'company001',
          departmentName: '営業部',
          parentDepartmentId: 'parent001',
          managerUserId: 'manager001',
          createdAt: new Date('2025-01-01'),
          updatedAt: new Date('2025-01-01'),
        },
      },
      month: '2025-06',
      expenseRecords: [], // 実際にはExpenseType[]が入る
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
      submittedAt: '2025-06-30T17:30:00',
      issues: ['high_amount'],
      approvalOrder: 2,
      totalSteps: 3,
    },
    {
      id: '6',
      userId: 'user002',
      user: {
        id: 'user002',
        email: 'sato@company.com',
        passwordHash: 'hash2',
        firstName: '花子',
        lastName: '佐藤',
        companyId: 'company001',
        departmentId: 'dept002',
        roleId: 'role001',
        createdAt: new Date('2025-01-01'),
        updatedAt: new Date('2025-01-01'),
        department: {
          id: 'dept002',
          companyId: 'company001',
          departmentName: '開発部',
          parentDepartmentId: 'parent001',
          managerUserId: 'manager002',
          createdAt: new Date('2025-01-01'),
          updatedAt: new Date('2025-01-01'),
        },
      },
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

const MonthlyApprovalList: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<MonthlyAttendanceApproval | MonthlyExpenseApproval | null>(null);
  const [approvalComment, setApprovalComment] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // フィルタリング処理
  const filteredAttendanceData = sampleMonthlyApprovals.attendance.filter((item) => {
    const matchesDepartment = departmentFilter === 'all' || item.user.department.departmentName === departmentFilter;
    const matchesStatus = statusFilter === 'all' || item.status.statusCode.toLowerCase() === statusFilter;
    const fullName = `${item.user.lastName}${item.user.firstName}`;
    const matchesSearch = fullName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDepartment && matchesStatus && matchesSearch;
  });

  const filteredExpenseData = sampleMonthlyApprovals.expense.filter((item) => {
    const matchesDepartment = departmentFilter === 'all' || item.user.department.departmentName === departmentFilter;
    const matchesStatus = statusFilter === 'all' || item.status.statusCode.toLowerCase() === statusFilter;
    const fullName = `${item.user.lastName}${item.user.firstName}`;
    const matchesSearch = fullName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDepartment && matchesStatus && matchesSearch;
  });

  const handleSelectAll = (data: (MonthlyAttendanceApproval | MonthlyExpenseApproval)[], checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, ...data.map((item) => item.id)]);
    } else {
      const dataIds = data.map((item) => item.id);
      setSelectedItems(selectedItems.filter((id) => !dataIds.includes(id)));
    }
  };

  const handleSelectItem = (itemId: string, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, itemId]);
    } else {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    }
  };

  const handleBulkApproval = (action: 'approve' | 'reject') => {
    console.log(`${action} approval for items:`, selectedItems);
    console.log('Comment:', approvalComment);
    setSelectedItems([]);
    setApprovalComment('');
    // ここで実際の一括承認処理API呼び出し
  };

  const handleIndividualApproval = (
    action: 'approve' | 'reject',
    item: MonthlyAttendanceApproval | MonthlyExpenseApproval,
  ) => {
    console.log(`${action} approval for:`, item);
    console.log('Comment:', approvalComment);
    setApprovalComment('');
    setIsDialogOpen(false);
    // ここで実際の個別承認処理API呼び出し
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
    }).format(amount);
  };

  const getIssueIcon = (issues: string[]) => {
    if (issues.includes('excessive_overtime') || issues.includes('high_amount')) {
      return <AlertTriangle className="h-4 w-4 text-red-500" />;
    }
    if (issues.includes('insufficient_hours')) {
      return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    }
    return null;
  };

  const getStatusBadge = (approvalOrder: number, totalSteps: number, statusCode: string) => {
    if (statusCode === 'APPROVED') {
      return (
        <Badge variant="success" className="bg-green-100 text-green-800">
          承認済み
        </Badge>
      );
    }
    if (statusCode === 'REJECTED') {
      return <Badge variant="destructive">却下</Badge>;
    }
    if (approvalOrder === 1) {
      return <Badge variant="destructive">1次承認待ち</Badge>;
    } else if (approvalOrder === totalSteps) {
      return <Badge variant="secondary">最終承認待ち</Badge>;
    } else {
      return <Badge variant="outline">{approvalOrder}次承認待ち</Badge>;
    }
  };

  const getAttendanceCategoryName = (categoryCode: string): string => {
    const categoryNames = {
      WORK: '出勤',
      PAID_LEAVE: '有給',
      ABSENCE: '欠勤',
      SPECIAL: '特別',
    };
    return categoryNames[categoryCode] || categoryCode;
  };

  const getExpenseCategoryName = (categoryCode: string): string => {
    const categoryNames = {
      TRANSPORT: '交通費',
      GENERAL: '一般経費',
    };
    return categoryNames[categoryCode] || categoryCode;
  };

  const departments: string[] = ['all', '営業部', '開発部', '総務部'];

  return (
    <div className="max-w-full mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">月次承認一覧</h1>
        <div className="flex gap-2">
          <Badge variant="outline" className="text-sm">
            勤怠: {filteredAttendanceData.length}件
          </Badge>
          <Badge variant="outline" className="text-sm">
            経費: {filteredExpenseData.length}件
          </Badge>
        </div>
      </div>

      {/* フィルタエリア */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-gray-500" />
              <Input
                placeholder="従業員名で検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-48"
              />
            </div>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="部署" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部署</SelectItem>
                {departments.slice(1).map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="状態" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全状態</SelectItem>
                <SelectItem value="pending">承認待ち</SelectItem>
                <SelectItem value="approved">承認済み</SelectItem>
                <SelectItem value="rejected">却下</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
              CSV出力
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="attendance" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="attendance" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            勤怠承認 ({filteredAttendanceData.length})
          </TabsTrigger>
          <TabsTrigger value="expense" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            経費承認 ({filteredExpenseData.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="attendance" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  勤怠月次承認
                </CardTitle>
                <div className="flex gap-2">
                  {selectedItems.length > 0 && (
                    <>
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleBulkApproval('approve')}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        一括承認 ({selectedItems.length})
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 border-red-600 hover:bg-red-50"
                        onClick={() => handleBulkApproval('reject')}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        一括却下
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="text-left p-3">
                        <Checkbox
                          checked={
                            filteredAttendanceData.length > 0 &&
                            selectedItems.filter((id) => filteredAttendanceData.some((item) => item.id === id))
                              .length === filteredAttendanceData.length
                          }
                          onCheckedChange={(checked) => handleSelectAll(filteredAttendanceData, checked)}
                        />
                      </th>
                      <th className="text-left p-3">従業員</th>
                      <th className="text-left p-3">部署</th>
                      <th className="text-left p-3">出勤日数</th>
                      <th className="text-left p-3">総労働時間</th>
                      <th className="text-left p-3">残業時間</th>
                      <th className="text-left p-3">内訳</th>
                      <th className="text-left p-3">状態</th>
                      <th className="text-left p-3">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAttendanceData.map((item) => (
                      <tr key={item.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">
                          <Checkbox
                            checked={selectedItems.includes(item.id)}
                            onCheckedChange={(checked) => handleSelectItem(item.id, checked)}
                          />
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            {getIssueIcon(item.issues)}
                            <span className="font-medium">
                              {item.user.lastName}
                              {item.user.firstName}
                            </span>
                          </div>
                        </td>
                        <td className="p-3 text-sm text-gray-600">{item.user.department.departmentName}</td>
                        <td className="p-3">
                          <div className="text-sm">
                            <span className="font-medium">{item.actualWorkDays}</span>
                            <span className="text-gray-500">/{item.totalWorkDays}日</span>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="text-sm">
                            <span className="font-medium">{item.totalWorkHours}h</span>
                            <br />
                            <span className="text-gray-500">({item.regularHours}h)</span>
                          </div>
                        </td>
                        <td className="p-3">
                          <span className={`font-medium ${item.overtimeHours > 15 ? 'text-red-600' : 'text-blue-600'}`}>
                            {item.overtimeHours}h
                          </span>
                        </td>
                        <td className="p-3">
                          <div className="flex flex-wrap gap-1">
                            {Object.entries(item.categoryBreakdown).map(
                              ([category, count]) =>
                                count > 0 && (
                                  <Badge key={category} variant="outline" className="text-xs">
                                    {getAttendanceCategoryName(category)}
                                    {count}
                                  </Badge>
                                ),
                            )}
                          </div>
                        </td>
                        <td className="p-3">
                          {getStatusBadge(item.approvalOrder, item.totalSteps, item.status.statusCode)}
                        </td>
                        <td className="p-3">
                          <div className="flex gap-1">
                            <Dialog open={isDialogOpen && selectedItem?.id === item.id} onOpenChange={setIsDialogOpen}>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm" onClick={() => setSelectedItem(item)}>
                                  詳細
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>
                                    {item.user.lastName}
                                    {item.user.firstName}さんの勤怠詳細 (2025年6月)
                                  </DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <h4 className="font-medium">勤務実績</h4>
                                      <div className="bg-gray-50 p-3 rounded space-y-1 text-sm">
                                        <div className="flex justify-between">
                                          <span>出勤日数:</span>
                                          <span>
                                            {item.actualWorkDays}/{item.totalWorkDays}日
                                          </span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span>総労働時間:</span>
                                          <span>{item.totalWorkHours}時間</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span>残業時間:</span>
                                          <span className={item.overtimeHours > 15 ? 'text-red-600 font-medium' : ''}>
                                            {item.overtimeHours}時間
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="space-y-2">
                                      <h4 className="font-medium">勤怠内訳</h4>
                                      <div className="bg-blue-50 p-3 rounded space-y-1 text-sm">
                                        {Object.entries(item.categoryBreakdown).map(([category, count]) => (
                                          <div key={category} className="flex justify-between">
                                            <span>{getAttendanceCategoryName(category)}:</span>
                                            <span>{count}日</span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>

                                  {item.issues.length > 0 && (
                                    <div className="bg-yellow-50 p-3 rounded">
                                      <h4 className="font-medium text-yellow-800 mb-2">注意事項</h4>
                                      <ul className="space-y-1 text-sm">
                                        {item.issues.includes('excessive_overtime') && (
                                          <li className="text-red-600">⚠ 残業時間が15時間を超えています</li>
                                        )}
                                        {item.issues.includes('insufficient_hours') && (
                                          <li className="text-yellow-600">⚠ 所定労働時間に達していません</li>
                                        )}
                                      </ul>
                                    </div>
                                  )}

                                  <div>
                                    <label className="text-sm font-medium">承認コメント</label>
                                    <Textarea
                                      value={approvalComment}
                                      onChange={(e) => setApprovalComment(e.target.value)}
                                      placeholder="承認理由やコメントを入力..."
                                      className="mt-1"
                                    />
                                  </div>

                                  <div className="flex gap-2 pt-2">
                                    <Button
                                      onClick={() => handleIndividualApproval('approve', item)}
                                      className="bg-green-600 hover:bg-green-700"
                                    >
                                      <CheckCircle className="h-4 w-4 mr-1" />
                                      承認する
                                    </Button>
                                    <Button
                                      variant="outline"
                                      onClick={() => handleIndividualApproval('reject', item)}
                                      className="text-red-600 border-red-600 hover:bg-red-50"
                                    >
                                      <XCircle className="h-4 w-4 mr-1" />
                                      却下する
                                    </Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expense" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  経費月次承認
                </CardTitle>
                <div className="flex gap-2">
                  {selectedItems.length > 0 && (
                    <>
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleBulkApproval('approve')}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        一括承認 ({selectedItems.length})
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 border-red-600 hover:bg-red-50"
                        onClick={() => handleBulkApproval('reject')}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        一括却下
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="text-left p-3">
                        <Checkbox
                          checked={
                            filteredExpenseData.length > 0 &&
                            selectedItems.filter((id) => filteredExpenseData.some((item) => item.id === id)).length ===
                              filteredExpenseData.length
                          }
                          onCheckedChange={(checked) => handleSelectAll(filteredExpenseData, checked)}
                        />
                      </th>
                      <th className="text-left p-3">従業員</th>
                      <th className="text-left p-3">部署</th>
                      <th className="text-left p-3">申請金額</th>
                      <th className="text-left p-3">件数</th>
                      <th className="text-left p-3">内訳</th>
                      <th className="text-left p-3">状態</th>
                      <th className="text-left p-3">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredExpenseData.map((item) => (
                      <tr key={item.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">
                          <Checkbox
                            checked={selectedItems.includes(item.id)}
                            onCheckedChange={(checked) => handleSelectItem(item.id, checked)}
                          />
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            {getIssueIcon(item.issues)}
                            <span className="font-medium">
                              {item.user.lastName}
                              {item.user.firstName}
                            </span>
                          </div>
                        </td>
                        <td className="p-3 text-sm text-gray-600">{item.user.department.departmentName}</td>
                        <td className="p-3">
                          <span
                            className={`font-medium text-lg ${item.totalAmount > 30000 ? 'text-red-600' : 'text-green-600'}`}
                          >
                            {formatCurrency(item.totalAmount)}
                          </span>
                        </td>
                        <td className="p-3">
                          <span className="font-medium">{item.itemCount}件</span>
                        </td>
                        <td className="p-3">
                          <div className="flex flex-wrap gap-1">
                            {Object.entries(item.categoryBreakdown).map(([category, data]) => (
                              <Badge key={category} variant="outline" className="text-xs">
                                {getExpenseCategoryName(category)} {formatCurrency(data.amount)}
                              </Badge>
                            ))}
                          </div>
                        </td>
                        <td className="p-3">
                          {getStatusBadge(item.approvalOrder, item.totalSteps, item.status.statusCode)}
                        </td>
                        <td className="p-3">
                          <Dialog open={isDialogOpen && selectedItem?.id === item.id} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => setSelectedItem(item)}>
                                詳細
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>
                                  {item.user.lastName}
                                  {item.user.firstName}さんの経費詳細 (2025年6月)
                                </DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <h4 className="font-medium">申請サマリー</h4>
                                    <div className="bg-gray-50 p-3 rounded space-y-1 text-sm">
                                      <div className="flex justify-between">
                                        <span>総額:</span>
                                        <span className="font-medium">{formatCurrency(item.totalAmount)}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span>件数:</span>
                                        <span>{item.itemCount}件</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    <h4 className="font-medium">カテゴリ別内訳</h4>
                                    <div className="bg-blue-50 p-3 rounded space-y-1 text-sm">
                                      {Object.entries(item.categoryBreakdown).map(([category, data]) => (
                                        <div key={category} className="flex justify-between">
                                          <span>{getExpenseCategoryName(category)}:</span>
                                          <span>
                                            {formatCurrency(data.amount)} ({data.count}件)
                                          </span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>

                                {item.issues.length > 0 && (
                                  <div className="bg-yellow-50 p-3 rounded">
                                    <h4 className="font-medium text-yellow-800 mb-2">注意事項</h4>
                                    <ul className="space-y-1 text-sm">
                                      {item.issues.includes('high_amount') && (
                                        <li className="text-red-600">⚠ 高額申請のため上位承認が必要です</li>
                                      )}
                                    </ul>
                                  </div>
                                )}

                                <div>
                                  <label className="text-sm font-medium">承認コメント</label>
                                  <Textarea
                                    value={approvalComment}
                                    onChange={(e) => setApprovalComment(e.target.value)}
                                    placeholder="承認理由やコメントを入力..."
                                    className="mt-1"
                                  />
                                </div>

                                <div className="flex gap-2 pt-2">
                                  <Button
                                    onClick={() => handleIndividualApproval('approve', item)}
                                    className="bg-green-600 hover:bg-green-700"
                                  >
                                    <CheckCircle className="h-4 w-4 mr-1" />
                                    承認する
                                  </Button>
                                  <Button
                                    variant="outline"
                                    onClick={() => handleIndividualApproval('reject', item)}
                                    className="text-red-600 border-red-600 hover:bg-red-50"
                                  >
                                    <XCircle className="h-4 w-4 mr-1" />
                                    却下する
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MonthlyApprovalList;
