import { FilterableColumnsType } from '@/type/filterableColumnsType';

export const filterCompanyCodeColumns: FilterableColumnsType[] = [
  {
    filter: 'code',
    header: '会社コード',
  },
  {
    filter: 'name',
    header: '会社名',
  },
  {
    filter: 'createdAt',
    header: '作成日',
  },
];
