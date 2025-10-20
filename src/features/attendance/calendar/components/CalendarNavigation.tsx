import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type CalendarNavigationProps = {
  previousMonth: () => void;
  nextMonth: () => void;
  goToToday: () => void;
};

const CalendarNavigation = ({ previousMonth, nextMonth, goToToday }: CalendarNavigationProps) => {
  return (
    <div className="flex items-center gap-1 bg-white/80 dark:bg-slate-800/80 rounded-lg p-1 border border-slate-200/50 dark:border-slate-700/50 shadow-sm backdrop-blur-sm hover:bg-white/90 dark:hover:bg-slate-800/90 transition-all duration-200">
      <Button
        variant="ghost"
        size="icon"
        onClick={previousMonth}
        className="h-8 w-8 hover:bg-gradient-to-r hover:from-blue-50/80 hover:to-indigo-50/80 dark:hover:from-slate-700/60 dark:hover:to-indigo-800/60 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={goToToday}
        className="h-8 px-3 hover:bg-gradient-to-r hover:from-blue-50/80 hover:to-indigo-50/80 dark:hover:from-slate-700/60 dark:hover:to-indigo-800/60 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-all duration-200"
      >
        今日
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={nextMonth}
        className="h-8 w-8 hover:bg-gradient-to-r hover:from-blue-50/80 hover:to-indigo-50/80 dark:hover:from-slate-700/60 dark:hover:to-indigo-800/60 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default CalendarNavigation;
