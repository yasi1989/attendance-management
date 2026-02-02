import { DataTable } from '@/components/table/DataTable';
import { Holiday } from '@/lib/actionTypes';
import { holidaysColumns } from '../table/HolidaysColumns';

type HolidaysListTableProps = {
  holidays: Holiday[];
};

const HolidaysListTable = ({ holidays }: HolidaysListTableProps) => {
  return <DataTable columns={holidaysColumns} data={holidays} enableFilter />;
};

export default HolidaysListTable;
