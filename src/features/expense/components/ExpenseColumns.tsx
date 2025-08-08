'use client';
import { ArrowUpDown, FileText, Calendar, Check, Receipt, DollarSign, Navigation } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { formatDateToISOString } from '@/lib/date';
import { Checkbox } from '@/components/ui/checkbox';
import { compareAsc } from 'date-fns';
import StatusBadge, { getStatusName } from '@/components/layout/StatusBadge';
import ExpenseTypeBadge, { getExpenseTypeName } from './ExpenseTypeBadge';
import ExpenseDeleteDialog from '../dialogs/components/ExpenseDeleteDialog';
import { ExpenseUpsertDialog } from '../dialogs/components/ExpenseUpsertDialog';
import { ExpenseItem } from '../type/ExpenseType';
import { EditButton } from '@/components/actionButton/EditButton';
import { ViewButton } from '@/components/actionButton/ViewButton';
import { EXPENSE_TABLE_LABELS, EXPENSE_TABLE_CONFIG, EXPENSE_TABLE_UTILS } from '../const/table';
import { TABLE_STYLES, TABLE_LABELS, TABLE_FORMATS } from '@/consts/table';
import { truncate } from '@/lib/utils';
import { formatCurrency } from '@/lib/currency';

export const expenseColumns: ColumnDef<ExpenseItem>[] = [
  {
    id: 'select',
    header: ({ table }) => {
      const submittedRows = table
        .getRowModel()
        .rows.filter((row) => EXPENSE_TABLE_UTILS.canSubmit(row.original.statusCode));
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
            aria-label={TABLE_LABELS.ja.SELECT_ALL}
            className={TABLE_STYLES.INTERACTIVE.CHECKBOX}
          />
        </div>
      );
    },
    cell: ({ row }) => {
      const status = row.original.statusCode;
      return (
        <div className="flex items-center justify-center">
          <Checkbox
            disabled={!EXPENSE_TABLE_UTILS.canSubmit(status)}
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label={TABLE_LABELS.ja.SELECT_ROW}
            className={TABLE_STYLES.INTERACTIVE.CHECKBOX}
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
            className={TABLE_STYLES.INTERACTIVE.SORT_BUTTON}
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            <div className="flex items-center gap-2">
              <Calendar className={TABLE_STYLES.SIZING.ICON} />
              <span>{EXPENSE_TABLE_LABELS.ja.EXPENSE_DATE}</span>
              <ArrowUpDown className={TABLE_STYLES.SIZING.ICON} />
            </div>
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="font-semibold" title={formatDateToISOString(row.original.expenseDate, TABLE_FORMATS.DATE)}>
        {formatDateToISOString(row.original.expenseDate, TABLE_FORMATS.DATE)}
      </div>
    ),
    sortingFn: (rowA, rowB) => {
      return compareAsc(rowA.original.expenseDate, rowB.original.expenseDate);
    },
    meta: {
      enableColumnFilter: true,
      japaneseLabel: EXPENSE_TABLE_LABELS.ja.EXPENSE_DATE,
    },
    filterFn: (row, _id, filterValue) => {
      return formatDateToISOString(row.original.expenseDate, TABLE_FORMATS.DATE).includes(filterValue);
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
            className={TABLE_STYLES.INTERACTIVE.SORT_BUTTON}
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            <div className="flex items-center gap-2">
              <Calendar className={TABLE_STYLES.SIZING.ICON} />
              <span>{EXPENSE_TABLE_LABELS.ja.REQUEST_DATE}</span>
              <ArrowUpDown className={TABLE_STYLES.SIZING.ICON} />
            </div>
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="font-semibold" title={formatDateToISOString(row.original.requestDate, TABLE_FORMATS.DATE)}>
        {formatDateToISOString(row.original.requestDate, TABLE_FORMATS.DATE)}
      </div>
    ),
    sortingFn: (rowA, rowB) => {
      return compareAsc(rowA.original.requestDate, rowB.original.requestDate);
    },
    meta: {
      enableColumnFilter: true,
      japaneseLabel: EXPENSE_TABLE_LABELS.ja.REQUEST_DATE,
    },
    filterFn: (row, _id, filterValue) => {
      return formatDateToISOString(row.original.requestDate, TABLE_FORMATS.DATE).includes(filterValue);
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
            className={TABLE_STYLES.INTERACTIVE.SORT_BUTTON}
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            <div className="flex items-center gap-2">
              <Check className={TABLE_STYLES.SIZING.ICON} />
              <span>{EXPENSE_TABLE_LABELS.ja.STATUS}</span>
              <ArrowUpDown className={TABLE_STYLES.SIZING.ICON} />
            </div>
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <StatusBadge status={row.original.statusCode} />
      </div>
    ),
    sortingFn: (rowA, rowB) => {
      return getStatusName(rowA.original.statusCode).localeCompare(getStatusName(rowB.original.statusCode));
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
            className={TABLE_STYLES.INTERACTIVE.SORT_BUTTON}
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            <div className="flex items-center gap-2">
              <Navigation className={TABLE_STYLES.SIZING.ICON} />
              <span>{EXPENSE_TABLE_LABELS.ja.EXPENSE_TYPE}</span>
              <ArrowUpDown className={TABLE_STYLES.SIZING.ICON} />
            </div>
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <ExpenseTypeBadge status={row.original.expenseType} />
      </div>
    ),
    sortingFn: (rowA, rowB) => {
      return getExpenseTypeName(rowA.original.expenseType).localeCompare(getExpenseTypeName(rowB.original.expenseType));
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
            className={TABLE_STYLES.INTERACTIVE.SORT_BUTTON}
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            <div className="flex items-center gap-2">
              <DollarSign className={TABLE_STYLES.SIZING.ICON} />
              <span>{EXPENSE_TABLE_LABELS.ja.AMOUNT}</span>
              <ArrowUpDown className={TABLE_STYLES.SIZING.ICON} />
            </div>
          </Button>
        </div>
      );
    },
    cell: ({ row }) => <div className="text-right">{formatCurrency(row.original.amount)}</div>,
  },
  {
    accessorKey: 'description',
    id: 'description',
    header: () => {
      return (
        <div className="flex items-center justify-center">
          <Button variant="ghost" className="flex items-center gap-2">
            <FileText className={TABLE_STYLES.SIZING.ICON} />
            <span>{EXPENSE_TABLE_LABELS.ja.DESCRIPTION}</span>
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="max-w-xs text-sm text-slate-600">
        {truncate(row.original.description || '', EXPENSE_TABLE_CONFIG.FIELD_LIMITS.DESCRIPTION_MAX_LENGTH)}
      </div>
    ),
  },
  {
    accessorKey: 'receiptUrl',
    id: 'receiptUrl',
    header: () => {
      return (
        <div className="flex items-center justify-center">
          <Button variant="ghost" className="flex items-center gap-2">
            <Receipt className={TABLE_STYLES.SIZING.ICON} />
            <span>{EXPENSE_TABLE_LABELS.ja.RECEIPT}</span>
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
          <Button variant="ghost">{TABLE_LABELS.ja.ACTIONS}</Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className={TABLE_STYLES.LAYOUT.ACTIONS_CELL}>
          <ExpenseUpsertDialog
            type="edit"
            expense={row.original}
            triggerContent={<EditButton editable={EXPENSE_TABLE_UTILS.canSubmit(row.original.statusCode)} />}
          />
          {EXPENSE_TABLE_UTILS.canSubmit(row.original.statusCode) && <ExpenseDeleteDialog />}
        </div>
      );
    },
    meta: {
      japaneseLabel: TABLE_LABELS.ja.ACTIONS,
      enableColumnFilter: false,
    },
  },
];
