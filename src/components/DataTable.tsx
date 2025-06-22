'use client';

import { useState, useMemo } from 'react';
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
  RowSelectionState,
} from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search, Filter, ChevronLeft, ChevronRight, Database, Users } from 'lucide-react';

interface ColumnDataMeta {
  enableColumnFilter?: boolean;
  japaneseLabel?: string;
}

type ColumnDefWithMeta<TData, TValue> = ColumnDef<TData, TValue> & {
  meta?: ColumnDataMeta;
};

interface DataTableProps<TData> {
  columns: ColumnDefWithMeta<TData, unknown>[];
  data: TData[];
  enableFilter?: boolean;
  enableSelection?: boolean;
  getRowId?: (item: TData, index: number) => string;
  renderBulkActions?: (selectedIds: string[], selectedItems: TData[]) => React.ReactNode;
}

export function DataTable<TData>({
  columns,
  data,
  getRowId,
  enableFilter = false,
  enableSelection = false,
  renderBulkActions,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [filterColumn, setFilterColumn] = useState<string>('');
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: enableSelection,
    getRowId: getRowId ? (row, index) => getRowId(row, index) : undefined,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  const selectedRows = table.getFilteredSelectedRowModel().rows;
  const selectedData = useMemo(() => {
    return selectedRows.map((row) => row.original);
  }, [selectedRows]);

  const selectedIds = useMemo(() => {
    if (!getRowId) {
      return Object.keys(rowSelection).filter((key) => rowSelection[key]);
    }
    return selectedData.map((item, index) => getRowId(item, index));
  }, [selectedData, getRowId, rowSelection]);

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

  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = table.getPageCount();

  return (
    <div className="w-full space-y-4">
      {/* フィルター部分 */}
      {enableFilter && columns.filter((column) => column.meta?.enableColumnFilter).length > 0 && (
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-blue-50/50 dark:from-slate-900 dark:to-blue-900/20 rounded-xl border border-slate-200/60 dark:border-slate-700/60 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-md">
              <Filter className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">フィルター</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">データ絞り込み</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Select value={filterColumn} onValueChange={handleColumnChange}>
              <SelectTrigger className="w-[160px] bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 rounded-lg shadow-sm hover:border-blue-400 dark:hover:border-blue-500 transition-colors text-sm">
                <SelectValue placeholder="列を選択" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg shadow-lg">
                {columns
                  .filter((column) => column.meta?.enableColumnFilter)
                  .map((column) => (
                    <SelectItem
                      key={column.id}
                      value={column.id || ''}
                      className="hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors text-sm"
                    >
                      {column.meta?.japaneseLabel}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>

            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <Input
                placeholder={`${columns.find((column) => column.id === filterColumn)?.meta?.japaneseLabel || 'キーワード'}で検索`}
                value={(filterColumn && (getColumn(filterColumn)?.getFilterValue() as string)) || ''}
                onChange={handleFilterChange}
                className="pl-9 w-64 text-sm bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 rounded-lg shadow-sm hover:border-blue-400 dark:hover:border-blue-500 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all"
                disabled={!filterColumn}
              />
            </div>
          </div>
        </div>
      )}

      {/* 一括操作エリア（カスタマイズ可能） */}
      {enableSelection && selectedData.length > 0 && renderBulkActions && (
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
          <div className="flex items-center gap-2 mb-3">
            <Users className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">{selectedData.length}件選択中</span>
          </div>
          {renderBulkActions(selectedIds, selectedData)}
        </div>
      )}

      {/* テーブル部分 */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              {getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="bg-gradient-to-r from-slate-100 to-blue-50 dark:from-slate-800 dark:to-blue-900/30 border-b border-slate-200 dark:border-slate-700"
                >
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className="py-4 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap"
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
                      border-b border-slate-100 dark:border-slate-800 transition-colors duration-150
                      hover:bg-blue-50/50 dark:hover:bg-blue-900/20
                      ${row.getIsSelected() ? 'bg-blue-50 dark:bg-blue-900/30' : ''}
                      ${index % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-50/50 dark:bg-slate-800/30'}
                    `}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="py-4 px-4 text-sm text-slate-900 dark:text-slate-100 whitespace-nowrap"
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    <div className="flex flex-col items-center justify-center space-y-2 py-6">
                      <div className="flex items-center justify-center w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full">
                        <Database className="w-6 h-6 text-slate-400" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">
                          データが見つかりませんでした
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          フィルター条件を変更してお試しください
                        </p>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* ページネーション */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-50/50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
              <span>
                {getRowModel().rows.length === 0
                  ? '0件'
                  : `${table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-${Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, data.length)}件 / 全${data.length}件`}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {totalPages > 1 && (
              <span className="text-xs text-slate-600 dark:text-slate-400 mr-2">
                {currentPage} / {totalPages}
              </span>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={() => previousPage()}
              disabled={!getCanPreviousPage()}
              className="h-7 px-2 text-xs bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-3 h-3 mr-1" />
              前へ
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => nextPage()}
              disabled={!getCanNextPage()}
              className="h-7 px-2 text-xs bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              次へ
              <ChevronRight className="w-3 h-3 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
