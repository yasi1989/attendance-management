'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AttendanceForm from './AttendanceForm';

type CalendarDetailFormProps = {
  dateString: string;
};

const CalendarDetailForm = ({ dateString }: CalendarDetailFormProps) => {
  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="border-b bg-muted/20">
        <CardTitle className="text-xl">勤怠申請</CardTitle>
        <CardDescription>勤務形態や時間を選択して勤務情報を申請してください。</CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <AttendanceForm dateString={dateString} />
      </CardContent>
    </Card>
  );
};

export default CalendarDetailForm;
