import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Clock, Calendar, Send, RotateCcw, AlertCircle, Star } from 'lucide-react';
import { AttendanceData } from '../../types/attendance';
import { HolidayType } from '@/features/admin/holidays/type/holidayType';
import { formatDateToISOString } from '@/lib/date';
import { isSaturday, isSunday } from 'date-fns';
import InputSelectFormField from '@/components/InputSelectFormField';
import { useAttendance } from '../hooks/useAttendance';
import InputRadioFormField from '@/components/InputRadioFormField';
import InputCheckboxFormField from '@/components/InputCheckboxFormField';
import InputTimeFormField from '@/components/InputTimeFormField';
import InputTextFormField from '@/components/InputTextFormField';
import { FormProvider } from 'react-hook-form';
import { ATTENDANCE_OPTIONS, HALF_DAY_OPTIONS } from '../const/attendanceConst';
import { Form } from '@/components/ui/form';
import { Label } from '@/components/ui/label';

type AttendanceDialogProps = {
  day: Date;
  attendanceData?: AttendanceData;
  holidayInfo?: HolidayType;
  triggerContent?: React.ReactNode;
};

const AttendanceDialog = ({ day, attendanceData, holidayInfo, triggerContent }: AttendanceDialogProps) => {
  const [open, setOpen] = useState(false);
  const { form, onSubmit, resetAttendanceForm, resetHalfDayForm, attendanceType, isHalfDay, resetToDefault } =
    useAttendance(day, attendanceData);
  const isWeekend = isSaturday(day) || isSunday(day);

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <div onKeyUp={() => setOpen(true)} onKeyDown={() => setOpen(true)} className="cursor-pointer">
              {triggerContent}
            </div>
          </DialogTrigger>

          <DialogContent className="max-w-4xl sm:w-full p-0">
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <DialogHeader className="px-4 sm:px-6 py-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        holidayInfo || isWeekend
                          ? 'bg-gradient-to-br from-red-500 to-red-600'
                          : 'bg-gradient-to-br from-blue-600 to-indigo-600'
                      }`}
                    >
                      {holidayInfo || isWeekend ? (
                        <Star className="w-5 h-5 text-white" />
                      ) : (
                        <Calendar className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <DialogTitle className="text-lg sm:text-xl font-semibold">勤怠申請</DialogTitle>
                        {holidayInfo && (
                          <Badge
                            variant="outline"
                            className="text-xs bg-red-50 text-red-700 border-red-200 px-2 py-1 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800"
                          >
                            {holidayInfo.name}
                          </Badge>
                        )}
                      </div>
                      <DialogDescription className="text-sm sm:text-base">
                        {formatDateToISOString(day)}の勤務情報を入力してください
                      </DialogDescription>
                    </div>
                  </div>
                </div>
              </DialogHeader>

              <ScrollArea className="flex-1 px-4 sm:px-6">
                <Card>
                  <CardHeader className="space-y-4">
                    <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-base space-y-2 sm:space-y-0">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        <Label className="text-base font-medium">勤務情報</Label>
                      </div>
                      {holidayInfo && (
                        <Badge
                          variant="outline"
                          className="bg-red-50 text-red-700 border-red-200 px-2 py-1 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800"
                        >
                          {holidayInfo.name}
                        </Badge>
                      )}
                    </CardTitle>
                    {(isWeekend || holidayInfo) && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3 dark:bg-red-900/20 dark:border-red-800">
                        <div className="flex items-start space-x-2">
                          <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0 pt-1" />
                          <p className="text-xs text-red-800 dark:text-red-300">
                            通常は勤務日ではありません。特別な事情がある場合のみ申請してください。
                          </p>
                        </div>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <InputSelectFormField
                      form={form}
                      name="attendanceType"
                      label="勤怠種別"
                      options={ATTENDANCE_OPTIONS}
                      onValueChange={resetAttendanceForm}
                      required
                    />

                    {attendanceType === 'Paid' && (
                      <div className="space-y-4">
                        <InputCheckboxFormField
                          form={form}
                          name="isHalfDay"
                          label="半休申請"
                          onValueChange={resetHalfDayForm}
                        />
                        {isHalfDay && (
                          <div className="ml-6">
                            <InputRadioFormField form={form} name="halfDayType" options={HALF_DAY_OPTIONS} />
                          </div>
                        )}
                      </div>
                    )}

                    {(attendanceType === 'Work' || isHalfDay) && (
                      <div className="space-y-4">
                        <Separator />
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <InputTimeFormField
                              form={form}
                              name="check_in"
                              label="出勤時間"
                              placeholder="出勤時間"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <InputTimeFormField
                              form={form}
                              name="check_out"
                              label="退勤時間"
                              placeholder="退勤時間"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <InputTimeFormField
                              form={form}
                              name="rest"
                              label="休憩時間"
                              placeholder="休憩時間"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    <InputTextFormField
                      form={form}
                      name="comment"
                      label="備考"
                      placeholder="申請に関する補足事項があれば入力してください（任意）"
                      className="resize-none"
                      maxLength={500}
                    />
                  </CardContent>
                </Card>
              </ScrollArea>

              <DialogFooter className="px-4 sm:px-6 py-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full space-y-3 sm:space-y-0">
                  <Button
                    variant="outline"
                    onClick={resetToDefault}
                    className="border-gray-300 dark:border-gray-600 w-full sm:w-auto"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    リセット
                  </Button>

                  <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 w-full sm:w-auto">
                    <Send className="w-4 h-4 mr-2" />
                    登録する
                  </Button>
                </div>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </Form>
    </FormProvider>
  );
};

export default AttendanceDialog;
