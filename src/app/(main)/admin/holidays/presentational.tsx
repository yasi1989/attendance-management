import { HolidayType } from '@/features/admin/holidays/type/holidayType';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarDays } from 'lucide-react';
import { UpsertHolidayDialog } from '@/features/admin/holidays/components/UpsertHolidayDialog';
import HolidaysListTable from '@/features/admin/holidays/components/HolidaysListTable';
import { Label } from '@/components/ui/label';
import YearSelector from '@/features/admin/holidays/components/YearSelector';
import AddButton from '@/components/AddButton';
import CommonPageHeader from '@/components/CommonPageHeader';

type HolidaysPresentationalProps = {
  data: HolidayType[];
  currentYear: number;
};

const HolidaysPresentational = ({ data, currentYear }: HolidaysPresentationalProps) => {
  return (
    <Card className="shadow-lg border-0">
      <CommonPageHeader
        title="休日管理"
        description="登録されている休日を確認・管理できます"
        actionDialog={
          <UpsertHolidayDialog type="add">
            <AddButton label="休日登録" />
          </UpsertHolidayDialog>
        }
      />

      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-lg border border-blue-100 dark:border-gray-600">
          <div className="flex items-center space-x-2">
            <CalendarDays className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-200">表示年度:</Label>
          </div>
          <YearSelector currentYear={currentYear} />
          <div className="text-sm text-gray-600 dark:text-gray-300">{data.length}件の休日が登録されています</div>
        </div>

        <div className="overflow-x-auto">
          <HolidaysListTable data={data} />
        </div>
      </CardContent>
    </Card>
  );
};

export default HolidaysPresentational;
