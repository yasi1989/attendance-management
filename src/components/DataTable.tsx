'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useState } from 'react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';

interface ColumnDataMeta {
  enableFilter?: boolean;
  japaneseLabel?: string;
}

type ColumnDefWithMeta<TData, TValue> = ColumnDef<TData, TValue> & {
  meta?: ColumnDataMeta;
};

interface DataTableProps<TData, TValue> {
  columns: ColumnDefWithMeta<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [filterColumn, setFilterColumn] = useState<string>('');

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
  });

  const { getRowModel, getHeaderGroups, getColumn, previousPage, getCanPreviousPage, nextPage, getCanNextPage } = table;

  const handleColumnChange = (value: string) => {
    if (filterColumn) {
      getColumn(filterColumn)?.setFilterValue('');
    }
    setFilterColumn(value);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    getColumn(filterColumn)?.setFilterValue(value);
  };

  return (
    <div className="rounded-lg border border-slate-200 shadow-sm bg-white dark:bg-slate-900 dark:border-slate-700 overflow-hidden">
      {columns.filter((column) => column.meta?.enableFilter).length > 0 && (
        <div className="p-4 flex flex-col gap-2 sm:flex-row sm:items-center">
          <>
            <Select value={filterColumn} onValueChange={handleColumnChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="フィルター列を選択" />
              </SelectTrigger>
              <SelectContent>
                {columns
                  .filter((column) => column.meta?.enableFilter)
                  .map((column) => (
                    <SelectItem key={column.id} value={column.id || ''}>
                      {column.meta?.japaneseLabel}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>

            <Input
              placeholder={`Filter ${columns.find((column) => column.id === filterColumn)?.meta?.japaneseLabel || ''}...`}
              value={(filterColumn && (getColumn(filterColumn)?.getFilterValue() as string)) || ''}
              onChange={handleFilterChange}
              className="max-w-sm"
              disabled={!filterColumn}
            />
          </>
        </div>
      )}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-slate-50 dark:bg-slate-800">
            {getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-b border-slate-200 dark:border-slate-700">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="py-4 px-4 text-sm font-medium text-slate-700 dark:text-slate-300"
                    >
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {getRowModel().rows?.length ? (
              getRowModel().rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className={`
                    hover:bg-slate-50 dark:hover:bg-slate-800/60 
                    transition-colors
                    ${index % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-50/50 dark:bg-slate-800/20'}
                    border-b border-slate-100 dark:border-slate-800
                  `}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3 px-4">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-slate-500 dark:text-slate-400">
                  <div className="flex flex-col items-center justify-center space-y-2 py-6">
                    <p>データが見つかりませんでした</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end px-4 py-3 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-500 dark:text-slate-400">
        <div className="space-x-2">
          <Button variant="outline" size="sm" onClick={() => previousPage()} disabled={!getCanPreviousPage()}>
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => nextPage()} disabled={!getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
