import { HolidayType } from '@/features/admin/holidays/type/holidayType';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, PlusCircle, CalendarDays } from 'lucide-react';
import { UpsertHolidayDialog } from '@/features/admin/holidays/components/UpsertHolidayDialog';
import HolidaysListTable from '@/features/admin/holidays/components/HolidaysListTable';
import { Label } from '@/components/ui/label';
import YearSelector from '@/features/admin/holidays/components/YearSelector';

type HolidaysPresentationalProps = {
  data: HolidayType[];
  currentYear: number;
};

const HolidaysPresentational = ({ data, currentYear }: HolidaysPresentationalProps) => {
  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="border-b bg-muted/20 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl">休日管理</CardTitle>
            <CardDescription>登録されている休日を確認・管理できます</CardDescription>
          </div>
        </div>
        <UpsertHolidayDialog type="add">
          <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
            <PlusCircle size={18} />
            休日登録
          </Button>
        </UpsertHolidayDialog>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
          <div className="flex items-center space-x-2">
            <CalendarDays className="w-5 h-5 text-blue-600" />
            <Label className="text-sm font-medium text-gray-700">表示年度:</Label>
          </div>
          <YearSelector currentYear={currentYear} />
          <div className="text-sm text-gray-600">{data.length}件の休日が登録されています</div>
        </div>

        <div className="overflow-x-auto">
          <HolidaysListTable data={data} />
        </div>
      </CardContent>
    </Card>
  );
};

export default HolidaysPresentational;
