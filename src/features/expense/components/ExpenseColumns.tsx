'use client';
import { ArrowUpDown, FileText, Calendar, Check, Receipt, DollarSign, Navigation } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { compareAsc } from 'date-fns';
import StatusBadge from '@/components/layout/StatusBadge';
import ExpenseTypeBadge from './ExpenseTypeBadge';
import ExpenseDeleteDialog from '../dialogs/components/ExpenseDeleteDialog';
import { ExpenseUpsertDialog } from '../dialogs/components/ExpenseUpsertDialog';
import { ExpenseItem } from '../type/ExpenseType';
import { EditButton } from '@/components/actionButton/EditButton';
import { ViewButton } from '@/components/actionButton/ViewButton';
import { formatDateToISOString } from '@/lib/date';
import { truncate } from '@/lib/utils';
import { canPerformRequest, getStatusByValue } from '@/lib/status';
import { getExpenseTypeName } from '@/lib/expense';

export const expenseColumns: ColumnDef<ExpenseItem>[] = [
  {
    id: 'select',
    header: ({ table }) => {
      const SubmittedRows = table.getRowModel().rows.filter((row) => canPerformRequest(row.original.status));
      const allSubmittedSelected = SubmittedRows.length > 0 && SubmittedRows.every((row) => row.getIsSelected());
      const someSubmittedSelected = SubmittedRows.some((row) => row.getIsSelected());

      return (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={allSubmittedSelected || (someSubmittedSelected && 'indeterminate')}
            onCheckedChange={(value) => {
              SubmittedRows.forEach((row) => {
                row.toggleSelected(!!value);
              });
            }}
            aria-label="Select all Submitted"
            className="border-slate-400 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
          />
        </div>
      );
    },
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <div className="flex items-center justify-center">
          <Checkbox
            disabled={!canPerformRequest(status)}
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            className="border-slate-400 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
          />
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'expenseDate',
    id: 'expenseDate',
    header: ({ column }) => {
      return (
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
      );
    },
    cell: ({ row }) => (
      <div
        className="font-semibold text-slate-900 dark:text-slate-100"
        title={formatDateToISOString(row.original.expenseDate, 'yyyy-MM-dd')}
      >
        {formatDateToISOString(row.original.expenseDate, 'yyyy-MM-dd')}
      </div>
    ),
    sortingFn: (rowA, rowB) => {
      return compareAsc(rowA.original.expenseDate, rowB.original.expenseDate);
    },
    meta: {
      enableColumnFilter: true,
      japaneseLabel: '発生日',
    },
    filterFn: (row, _id, filterValue) => {
      return formatDateToISOString(row.original.expenseDate, 'yyyy-MM-dd').includes(filterValue);
    },
  },
  {
    accessorKey: 'requestDate',
    id: 'requestDate',
    header: ({ column }) => {
      return (
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
      );
    },
    cell: ({ row }) => (
      <div
        className="font-semibold text-slate-900 dark:text-slate-100"
        title={formatDateToISOString(row.original.requestDate, 'yyyy-MM-dd')}
      >
        {formatDateToISOString(row.original.requestDate, 'yyyy-MM-dd')}
      </div>
    ),
    sortingFn: (rowA, rowB) => {
      return compareAsc(rowA.original.requestDate, rowB.original.requestDate);
    },
    meta: {
      enableColumnFilter: true,
      japaneseLabel: '申請日',
    },
    filterFn: (row, _id, filterValue) => {
      return formatDateToISOString(row.original.requestDate, 'yyyy-MM-dd').includes(filterValue);
    },
  },
  {
    accessorKey: 'status',
    id: 'status',
    header: ({ column }) => {
      return (
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
      );
    },
    cell: ({ row }) => (
      <div className="text-center">
        <StatusBadge status={row.original.status} />
      </div>
    ),
    sortingFn: (rowA, rowB) => {
      const labelA = getStatusByValue(rowA.original.status)?.label;
      const labelB = getStatusByValue(rowB.original.status)?.label;
      return labelA && labelB ? labelA.localeCompare(labelB) : 0;
    },
  },
  {
    accessorKey: 'expenseType',
    id: 'expenseType',
    header: ({ column }) => {
      return (
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
      );
    },
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
    header: ({ column }) => {
      return (
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
      );
    },
    cell: ({ row }) => <div className="font-medium text-right">¥ {row.original.amount.toLocaleString()}</div>,
  },
  {
    accessorKey: 'description',
    id: 'description',
    header: () => {
      return (
        <div className="flex items-center justify-center">
          <Button variant="ghost">
            <FileText />
            説明
          </Button>
        </div>
      );
    },
    cell: ({ row }) => <div className="max-w-xs">{truncate(row.original.description, 20)}</div>,
  },
  {
    accessorKey: 'receiptUrl',
    id: 'receiptUrl',
    header: () => {
      return (
        <div className="flex items-center justify-center">
          <Button variant="ghost">
            <Receipt />
            領収証
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        {row.original.receiptUrl && row.original.receiptUrl !== '' && <ViewButton href={row.original.receiptUrl} />}
      </div>
    ),
  },
  {
    id: 'actions',
    header: () => {
      return (
        <div className="flex items-center justify-center">
          <Button variant="ghost">操作</Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex space-x-1 items-center justify-center">
          <ExpenseUpsertDialog
            expense={row.original}
            triggerContent={<EditButton editable={canPerformRequest(row.original.status)} />}
          />
          {canPerformRequest(row.original.status) && <ExpenseDeleteDialog />}
        </div>
      );
    },
    meta: {
      japaneseLabel: '操作',
      enableColumnFilter: false,
    },
  },
];
