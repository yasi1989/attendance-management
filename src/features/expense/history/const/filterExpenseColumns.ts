import { FilterableColumnsType } from '@/type/filterableColumnsType';

export const filterExpenseColumns: FilterableColumnsType[] = [
  {
    filter: 'request_date',
    header: '申請日',
  },
  {
    filter: 'expenseType',
    header: '経費',
  },
  {
    filter: 'status_id',
    header: '状態',
  },
];
