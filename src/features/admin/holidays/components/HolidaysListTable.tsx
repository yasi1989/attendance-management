import { DataTable } from '@/components/table/DataTable';
import { holidaysColumns } from './HolidaysColumns';
import { Holiday } from '@/lib/actionTypes';

type HolidaysListTableProps = {
  holidays: Holiday[];
};

const HolidaysListTable = ({ holidays }: HolidaysListTableProps) => {
  return <DataTable columns={holidaysColumns} data={holidays} enableFilter />;
};

export default HolidaysListTable;
