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
      {enableFilter && columns.filter((column) => column.meta?.enableColumnFilter).length > 0 && (
        <div className="flex md:flex-row flex-col md:items-center items-start justify-between p-4 gap-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg shadow-sm">
              <Filter className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">検索・フィルター</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">データを絞り込んで表示</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Select value={filterColumn} onValueChange={handleColumnChange}>
              <SelectTrigger className="w-[160px] bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600">
                <SelectValue placeholder="列を選択" />
              </SelectTrigger>
              <SelectContent>
                {columns
                  .filter((column) => column.meta?.enableColumnFilter)
                  .map((column) => (
                    <SelectItem key={column.id} value={column.id || ''}>
                      {column.meta?.japaneseLabel}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder={`${columns.find((column) => column.id === filterColumn)?.meta?.japaneseLabel || 'キーワード'}で検索`}
                value={(filterColumn && (getColumn(filterColumn)?.getFilterValue() as string)) || ''}
                onChange={handleFilterChange}
                className="pl-10 w-64 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600"
                disabled={!filterColumn}
              />
            </div>
          </div>
        </div>
      )}

      {enableSelection && selectedData.length > 0 && renderBulkActions && (
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
          <div className="flex items-center gap-2 mb-4">
            <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-900 dark:text-blue-100">{selectedData.length}件選択中</span>
          </div>
          {renderBulkActions(selectedIds, selectedData)}
        </div>
      )}

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              {getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
                >
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className="py-3 px-4 text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300"
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
                      border-b border-gray-100 dark:border-gray-800 transition-colors
                      hover:bg-gray-50 dark:hover:bg-gray-800
                      ${row.getIsSelected() ? 'bg-blue-50 dark:bg-blue-900/20' : ''}
                      ${index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50/50 dark:bg-gray-800/50'}
                    `}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-3 px-4 text-xs md:text-sm text-gray-900 dark:text-gray-100">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-32 text-center">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full">
                        <Database className="w-6 h-6 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">
                          データが見つかりませんでした
                        </p>
                        <p className="text-xs md:text-sm text-gray-500 dark:text-gray-500">検索条件を変更してお試しください</p>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {getRowModel().rows.length === 0
              ? '0件'
              : `${table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-${Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, data.length)}件 / 全${data.length}件`}
          </div>

          <div className="flex items-center gap-2">
            {totalPages > 1 && (
              <span className="text-sm text-gray-600 dark:text-gray-400 mr-3">
                {currentPage} / {totalPages}ページ
              </span>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={() => previousPage()}
              disabled={!getCanPreviousPage()}
              className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              前へ
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => nextPage()}
              disabled={!getCanNextPage()}
              className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              次へ
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
