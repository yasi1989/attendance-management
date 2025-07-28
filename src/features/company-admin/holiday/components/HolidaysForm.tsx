import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HolidayType } from '../type/holidayType';
import { UpsertHolidayDialog } from './UpsertHolidayDialog';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import HolidaysListTable from './HolidaysListTable';

type HolidaysFormProps = {
  data: HolidayType[];
};

const HolidaysForm = ({ data }: HolidaysFormProps) => {
  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="border-b bg-muted/20">
        <CardTitle className="text-xl">休日管理</CardTitle>
        <CardDescription>登録されている休日を確認・管理できます。</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-start">
          <UpsertHolidayDialog type="add">
            <Button className="flex items-center gap-2 whitespace-nowrap self-start sm:self-center">
              <PlusCircle size={18} />
              休日登録
            </Button>
          </UpsertHolidayDialog>
        </div>
        <div className="overflow-x-auto">
          <HolidaysListTable data={data} />
        </div>
      </CardContent>
    </Card>
  );
};

export default HolidaysForm;
