import { CardFooter } from '@/components/ui/card';

const CalendarFooter = () => {
  return (
    <CardFooter className="border-t border-gray-100 dark:border-gray-800 pb-3 flex justify-end items-center">
      <div className="flex items-center space-x-8 text-sm">
        <div className="flex items-center space-x-1">
          <div className="h-3 w-3 rounded-full bg-blue-500" />
          <span>PENDING</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <span>REJECTED</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="h-3 w-3 rounded-full bg-green-500" />
          <span>APPROVED</span>
        </div>
      </div>
    </CardFooter>
  );
};

export default CalendarFooter;
