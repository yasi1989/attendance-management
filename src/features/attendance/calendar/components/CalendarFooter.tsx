import { CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { STATUS } from '@/consts/status';

const COLORS = {
  [STATUS.PENDING.value]: 'text-blue-700',
  [STATUS.SUBMITTED.value]: 'text-orange-700',
  [STATUS.REJECTED.value]: 'text-red-700',
  [STATUS.APPROVED.value]: 'text-green-700',
};

const CalendarFooter = () => {
  return (
    <CardFooter className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/30 px-6 py-4">
      <div className="flex flex-wrap items-center justify-center gap-6 w-full">
        {Object.values(STATUS).map(({ value, icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2">
            <Icon className={`h-4 w-4 ${COLORS[value]}`} />
            <Label>{label}</Label>
          </div>
        ))}
      </div>
    </CardFooter>
  );
};

export default CalendarFooter;
