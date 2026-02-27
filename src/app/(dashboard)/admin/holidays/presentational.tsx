import { CalendarDays } from 'lucide-react';
import { AddButton } from '@/components/button/AddButton';
import CommonPageHeader from '@/components/layout/CommonPageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { FORM_MODE } from '@/consts/formMode';
import HolidaysListTable from '@/features/admin/holidays/components/HolidaysListTable';
import HolidaysYearSelector from '@/features/admin/holidays/components/HolidaysYearSelector';
import { UpsertHolidayDialog } from '@/features/admin/holidays/components/UpsertHolidayDialog';
import { HolidayDisplay } from '@/features/admin/holidays/type/holidaysDisplayType';
import { HolidayCategoryTypeWithAll } from '@/types/holiday';

type HolidaysPresentationalProps = {
  holidays: HolidayDisplay[];
  currentYear: number;
  currentCategory: HolidayCategoryTypeWithAll;
};

const HolidaysPresentational = ({ holidays, currentYear, currentCategory }: HolidaysPresentationalProps) => {
  return (
    <Card className="shadow-2xl border-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl ring-1 ring-slate-200/50 dark:ring-slate-800/50 overflow-hidden">
      <CommonPageHeader
        title="休日管理"
        description="登録されている休日を確認・管理できます"
        icon={<CalendarDays className="w-6 h-6 text-white" />}
        actionDialog={
          <UpsertHolidayDialog type={FORM_MODE.ADD.value}>
            <AddButton label="休日登録" />
          </UpsertHolidayDialog>
        }
      />

      <CardContent className="bg-linear-to-b from-white/80 to-slate-50/80 dark:from-slate-900/80 dark:to-slate-800/80 backdrop-blur-sm border-t border-slate-200/30 dark:border-slate-700/30 p-6 space-y-6">
        <HolidaysYearSelector currentYear={currentYear} currentCategory={currentCategory} />
        <div className="overflow-x-auto">
          <HolidaysListTable holidays={holidays} />
        </div>
      </CardContent>
    </Card>
  );
};

export default HolidaysPresentational;
