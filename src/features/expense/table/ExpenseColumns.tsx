'use client';
import { ColumnDef } from '@tanstack/react-table';
import { compareAsc } from 'date-fns';
import { ArrowUpDown, Calendar, Check, DollarSign, FileText, Navigation, Receipt } from 'lucide-react';
import { EditButton } from '@/components/actionButton/EditButton';
import { ViewButton } from '@/components/actionButton/ViewButton';
import StatusBadge from '@/components/layout/StatusBadge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { STATUS } from '@/consts/status';
import { ExpenseWithApproval } from '@/lib/actionTypes';
import { formatDateForDisplay } from '@/lib/dateClient';
import { getExpenseTypeName } from '@/lib/expense';
import { canPerformRequest, getStatusByValue } from '@/lib/status';
import { truncate } from '@/lib/utils';
import ExpenseTypeBadge from '../components/ExpenseTypeBadge';
import ExpenseDeleteDialog from '../dialogs/components/ExpenseDeleteDialog';
import { ExpenseUpsertDialog } from '../dialogs/components/ExpenseUpsertDialog';

const getStatus = (row: ExpenseWithApproval) => row.groupExpenseApproval?.statusCode ?? STATUS.PENDING.value;

const getRequestDate = (row: ExpenseWithApproval) => row.groupExpenseApproval?.submittedAt ?? null;

export const expenseColumns: ColumnDef<ExpenseWithApproval>[] = [
  {
    id: 'select',
    header: ({ table }) => {
      const submittedRows = table.getRowModel().rows.filter((row) => canPerformRequest(getStatus(row.original)));
      const allSubmittedSelected = submittedRows.length > 0 && submittedRows.every((row) => row.getIsSelected());
      const someSubmittedSelected = submittedRows.some((row) => row.getIsSelected());

      return (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={allSubmittedSelected || (someSubmittedSelected && 'indeterminate')}
            onCheckedChange={(value) => {
              submittedRows.forEach((row) => {
                row.toggleSelected(!!value);
              });
            }}
            aria-label="Select all Submitted"
            className="border-slate-400 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
          />
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          disabled={!canPerformRequest(getStatus(row.original))}
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="border-slate-400 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'expenseDate',
    id: 'expenseDate',
    header: ({ column }) => (
      <div className="flex items-center justify-center">
        <Button
          variant="ghost"
          className="p-0 h-auto hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <div className="flex items-center gap-1 md:gap-2">
            <Calendar className="h-3 w-3 md:h-4 md:w-4" />
            <span>発生日</span>
            <ArrowUpDown className="h-3 w-3 md:h-4 md:w-4" />
          </div>
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div
        className="font-semibold text-slate-900 dark:text-slate-100"
        title={formatDateForDisplay(row.original.expenseDate)}
      >
        {formatDateForDisplay(row.original.expenseDate)}
      </div>
    ),
    sortingFn: (rowA, rowB) => compareAsc(rowA.original.expenseDate, rowB.original.expenseDate),
    meta: {
      enableColumnFilter: true,
      japaneseLabel: '発生日',
    },
    filterFn: (row, _id, filterValue) => formatDateForDisplay(row.original.expenseDate).includes(filterValue),
  },
  {
    id: 'requestDate',
    header: ({ column }) => (
      <div className="flex items-center justify-center">
        <Button
          variant="ghost"
          className="p-0 h-auto hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <div className="flex items-center gap-1 md:gap-2">
            <Calendar className="h-3 w-3 md:h-4 md:w-4" />
            <span>申請日</span>
            <ArrowUpDown className="h-3 w-3 md:h-4 md:w-4" />
          </div>
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const requestDate = getRequestDate(row.original);
      return (
        <div className="font-semibold text-slate-900 dark:text-slate-100">
          {requestDate ? formatDateForDisplay(requestDate) : '-'}
        </div>
      );
    },
    sortingFn: (rowA, rowB) => {
      const dateA = getRequestDate(rowA.original);
      const dateB = getRequestDate(rowB.original);
      if (!dateA && !dateB) return 0;
      if (!dateA) return 1;
      if (!dateB) return -1;
      return compareAsc(dateA, dateB);
    },
    meta: {
      enableColumnFilter: true,
      japaneseLabel: '申請日',
    },
    filterFn: (row, _id, filterValue) => {
      const requestDate = getRequestDate(row.original);
      return requestDate ? formatDateForDisplay(requestDate).includes(filterValue) : false;
    },
  },
  {
    id: 'status',
    header: ({ column }) => (
      <div className="flex items-center justify-center">
        <Button
          variant="ghost"
          className="p-0 h-auto hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <div className="flex items-center gap-1 md:gap-2">
            <Check className="h-3 w-3 md:h-4 md:w-4" />
            <span>状態</span>
            <ArrowUpDown className="h-3 w-3 md:h-4 md:w-4" />
          </div>
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-center">
        <StatusBadge status={getStatus(row.original)} />
      </div>
    ),
    sortingFn: (rowA, rowB) => {
      const labelA = getStatusByValue(getStatus(rowA.original))?.label;
      const labelB = getStatusByValue(getStatus(rowB.original))?.label;
      return labelA && labelB ? labelA.localeCompare(labelB) : 0;
    },
  },
  {
    accessorKey: 'expenseType',
    id: 'expenseType',
    header: ({ column }) => (
      <div className="flex items-center justify-center">
        <Button
          variant="ghost"
          className="p-0 h-auto hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <div className="flex items-center gap-1 md:gap-2">
            <Navigation className="h-3 w-3 md:h-4 md:w-4" />
            <span>経費</span>
            <ArrowUpDown className="h-3 w-3 md:h-4 md:w-4" />
          </div>
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-center">
        <ExpenseTypeBadge status={row.original.expenseType} />
      </div>
    ),
    sortingFn: (rowA, rowB) => {
      const labelA = getExpenseTypeName(rowA.original.expenseType);
      const labelB = getExpenseTypeName(rowB.original.expenseType);
      return labelA && labelB ? labelA.localeCompare(labelB) : 0;
    },
  },
  {
    accessorKey: 'amount',
    id: 'amount',
    header: ({ column }) => (
      <div className="flex items-center justify-center">
        <Button
          variant="ghost"
          className="p-0 h-auto hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <div className="flex items-center gap-1 md:gap-2">
            <DollarSign className="h-3 w-3 md:h-4 md:w-4" />
            <span>金額</span>
            <ArrowUpDown className="h-3 w-3 md:h-4 md:w-4" />
          </div>
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="font-medium text-right">¥ {Number(row.original.amount).toLocaleString()}</div>,
  },
  {
    accessorKey: 'description',
    id: 'description',
    header: () => (
      <div className="flex items-center justify-center">
        <Button variant="ghost">
          <FileText />
          説明
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="max-w-xs">{truncate(row.original.description, 20)}</div>,
  },
  {
    accessorKey: 'receiptUrl',
    id: 'receiptUrl',
    header: () => (
      <div className="flex items-center justify-center">
        <Button variant="ghost">
          <Receipt />
          領収証
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        {row.original.receiptUrl && row.original.receiptUrl !== '' && <ViewButton href={row.original.receiptUrl} />}
      </div>
    ),
  },
  {
    id: 'actions',
    header: () => (
      <div className="flex items-center justify-center">
        <Button variant="ghost">操作</Button>
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex space-x-1 items-center justify-center">
        <ExpenseUpsertDialog
          expense={row.original}
          triggerContent={<EditButton editable={canPerformRequest(getStatus(row.original))} />}
        />
        {canPerformRequest(getStatus(row.original)) && <ExpenseDeleteDialog id={row.original.id} />}
      </div>
    ),
    meta: {
      japaneseLabel: '操作',
      enableColumnFilter: false,
    },
  },
];
