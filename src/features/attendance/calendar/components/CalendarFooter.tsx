import { CardFooter } from '@/components/ui/card';
import { CheckCircle, Clock, AlertTriangle, Coffee, FileText } from 'lucide-react';

const CalendarFooter = () => {
  const legendItems = [
    { icon: FileText, label: '下書き', color: 'text-blue-500' },
    { icon: Clock, label: '承認待ち', color: 'text-amber-500' },
    { icon: AlertTriangle, label: '差し戻し', color: 'text-red-500' },
    { icon: CheckCircle, label: '承認済み', color: 'text-emerald-500' },
    { icon: Coffee, label: '休暇', color: 'text-green-500' },
  ];

  return (
    <CardFooter className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/30 px-6 py-4">
      <div className="flex flex-wrap items-center justify-center gap-6 w-full">
        {legendItems.map(({ icon: Icon, label, color }) => (
          <div key={label} className="flex items-center gap-2">
            <Icon className={`h-4 w-4 ${color}`} />
            <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">{label}</span>
          </div>
        ))}
      </div>
    </CardFooter>
  );
};

export default CalendarFooter;
