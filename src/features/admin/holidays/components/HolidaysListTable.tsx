import { DataTable } from '@/components/DataTable';
import { holidaysColumns } from './HolidaysColumns';
import { HolidayType } from '../type/holidayType';

type HolidaysListTableProps = {
  data: HolidayType[];
};

const HolidaysListTable = ({ data }: HolidaysListTableProps) => {
  return <DataTable columns={holidaysColumns} data={data} enableFilter />;
};

export default HolidaysListTable;
