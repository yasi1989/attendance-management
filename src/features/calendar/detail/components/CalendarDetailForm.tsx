'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import AttendanceTab from './AttendanceTab';
import LeaveTab from './LeaveTab';

type CalendarDetailFormProps = {
  dateString: string;
};

const CalendarDetailForm = ({ dateString }: CalendarDetailFormProps) => {
  const [activeTab, setActiveTab] = useState<string>('attendance');
  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="border-b bg-muted/20">
        <CardTitle className="text-xl">勤務情報</CardTitle>
        <CardDescription>勤務形態や時間を選択して勤務情報を申請してください。</CardDescription>
      </CardHeader>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <CardContent className="pt-2">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="attendance">勤怠申請</TabsTrigger>
            <TabsTrigger value="leave">休暇申請</TabsTrigger>
          </TabsList>
          <TabsContent value="attendance">
            <AttendanceTab dateString={dateString} />
          </TabsContent>
          <TabsContent value="leave">
            <LeaveTab dateString={dateString} />
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
};

export default CalendarDetailForm;
