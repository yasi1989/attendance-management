import { DataTable } from '@/components/table/DataTable';
import { holidaysColumns } from '../table/HolidaysColumns';
import { HolidayType } from '../type/holidayType';

type HolidaysListTableProps = {
  data: HolidayType[];
};

const HolidaysListTable = ({ data }: HolidaysListTableProps) => {
  return <DataTable columns={holidaysColumns} data={data} enableFilter />;
};

export default HolidaysListTable;
