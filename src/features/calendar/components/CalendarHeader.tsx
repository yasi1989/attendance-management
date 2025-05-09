import { CardHeader } from "@/components/ui/card";
import { CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { MONTHS_EN } from "../const/const";

interface CalendarHeaderProps {
  currentDate: Date;
  previousMonth: () => void;
  nextMonth: () => void;
  goToToday: () => void;
}

const formatMonth = (date: Date) => {
    return `${MONTHS_EN[date.getMonth()]} ${date.getFullYear()}`;
}

const CalendarHeader = ({ currentDate, previousMonth, nextMonth, goToToday }: CalendarHeaderProps) => {
  return (
    <CardHeader className="border-b border-gray-100 dark:border-gray-800 pb-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          <CardTitle className="text-xl font-bold">{formatMonth(currentDate)}</CardTitle>
        </div>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" onClick={previousMonth} className="h-8 w-8">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={goToToday} className="h-8">
            今日
          </Button>
          <Button variant="ghost" size="icon" onClick={nextMonth} className="h-8 w-8">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </CardHeader>
  )
}

export default CalendarHeader