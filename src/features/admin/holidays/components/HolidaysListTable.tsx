import { DataTable } from '@/components/table/DataTable';
import { holidaysColumns } from '../table/HolidaysColumns';
import { HolidayDisplay } from '../type/holidaysDisplayType';

type HolidaysListTableProps = {
  holidays: HolidayDisplay[];
};

const HolidaysListTable = ({ holidays }: HolidaysListTableProps) => {
  return <DataTable columns={holidaysColumns} data={holidays} enableFilter />;
};

export default HolidaysListTable;
