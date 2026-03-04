'use client';
import { AlertTriangle, BarChart3, Briefcase, CalendarCheck, Clock, TrendingUp, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { MonthlyAttendanceSummary } from '@/types/attendance';

type CalendarMonthlySummaryProps = {
  summary: MonthlyAttendanceSummary;
  className?: string;
};

type StatCardProps = {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub?: string;
  colorClass?: string;
  bgClass?: string;
};

const StatCard = ({
  icon,
  label,
  value,
  sub,
  colorClass = 'text-blue-600 dark:text-blue-400',
  bgClass = 'bg-blue-50 dark:bg-blue-950/30',
}: StatCardProps) => (
  <div
    className={cn(
      'flex items-center gap-3 p-4 rounded-xl border border-gray-200/60 dark:border-gray-700/60',
      'bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm',
      'transition-all duration-200 hover:shadow-md hover:scale-[1.01]',
    )}
  >
    <div className={cn('flex items-center justify-center w-10 h-10 rounded-lg shrink-0', bgClass)}>
      <span className={cn('h-5 w-5', colorClass)}>{icon}</span>
    </div>
    <div className="min-w-0 flex-1">
      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium truncate">{label}</p>
      <p className="text-xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
        {value}
        {sub && <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-0.5">{sub}</span>}
      </p>
    </div>
  </div>
);

const CalendarMonthlySummary = ({ summary, className }: CalendarMonthlySummaryProps) => {
  const attendanceRate =
    summary.totalWorkDays > 0 ? Math.round((summary.actualWorkDays / summary.totalWorkDays) * 100) : 0;

  const overtimeNum = parseFloat(summary.overtimeHours);
  const regularNum = parseFloat(summary.regularHours);
  const totalNum = parseFloat(summary.totalWorkHours);
  const regularRatio = totalNum > 0 ? (regularNum / totalNum) * 100 : 0;

  return (
    <div className={cn('space-y-4 m-4', className)}>
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-9 h-9 bg-linear-to-r from-violet-600 to-indigo-600 rounded-lg shadow-sm">
          <BarChart3 className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">月次勤怠サマリー</h3>
        </div>
        {summary.issues && summary.issues.length > 0 && (
          <Badge className="ml-auto bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 gap-1 text-xs">
            <AlertTriangle className="h-3 w-3" />
            {summary.issues.length}件の問題
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard
          icon={<CalendarCheck className="h-5 w-5" />}
          label="出勤日数"
          value={`${summary.actualWorkDays} / ${summary.totalWorkDays}`}
          sub="日"
          colorClass="text-emerald-600 dark:text-emerald-400"
          bgClass="bg-emerald-50 dark:bg-emerald-950/30"
        />
        <StatCard
          icon={<Clock className="h-5 w-5" />}
          label="総労働時間"
          value={totalNum.toFixed(1)}
          sub="h"
          colorClass="text-blue-600 dark:text-blue-400"
          bgClass="bg-blue-50 dark:bg-blue-950/30"
        />
        <StatCard
          icon={<Briefcase className="h-5 w-5" />}
          label="所定内時間"
          value={regularNum.toFixed(1)}
          sub="h"
          colorClass="text-indigo-600 dark:text-indigo-400"
          bgClass="bg-indigo-50 dark:bg-indigo-950/30"
        />
        <StatCard
          icon={<Zap className="h-5 w-5" />}
          label="残業時間"
          value={overtimeNum.toFixed(1)}
          sub="h"
          colorClass={overtimeNum > 20 ? 'text-red-600 dark:text-red-400' : 'text-orange-600 dark:text-orange-400'}
          bgClass={overtimeNum > 20 ? 'bg-red-50 dark:bg-red-950/30' : 'bg-orange-50 dark:bg-orange-950/30'}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-4 rounded-xl border border-gray-200/60 dark:border-gray-700/60 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <TrendingUp className="h-4 w-4 text-emerald-500" />
              出勤率
            </div>
            <span className="text-lg font-bold text-gray-900 dark:text-gray-100">{attendanceRate}%</span>
          </div>
          <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-linear-to-r from-emerald-400 to-teal-500 transition-all duration-700"
              style={{ width: `${attendanceRate}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {summary.actualWorkDays}日 / {summary.totalWorkDays}日
          </p>
        </div>

        <div className="p-4 rounded-xl border border-gray-200/60 dark:border-gray-700/60 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            <Clock className="h-4 w-4 text-blue-500" />
            時間内訳
          </div>
          <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden flex">
            <div
              className="h-full bg-linear-to-r from-blue-400 to-indigo-500 transition-all duration-700"
              style={{ width: `${regularRatio}%` }}
            />
            <div
              className="h-full bg-linear-to-r from-orange-400 to-red-500 transition-all duration-700"
              style={{ width: `${100 - regularRatio}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-blue-400 inline-block" />
              所定内 {regularNum.toFixed(1)}h
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-orange-400 inline-block" />
              残業 {overtimeNum.toFixed(1)}h
            </span>
          </div>
        </div>
      </div>

      {summary.issues && summary.issues.length > 0 && (
        <div className="p-4 rounded-xl border border-red-200/60 dark:border-red-800/60 bg-red-50/50 dark:bg-red-950/20 backdrop-blur-sm space-y-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-red-700 dark:text-red-400">
            <AlertTriangle className="h-4 w-4" />
            確認が必要な問題
          </div>
          <ul className="space-y-1">
            {summary.issues.map((issue) => (
              <li key={issue} className="flex items-start gap-2 text-xs text-red-600 dark:text-red-400">
                <span className="mt-0.5 shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 dark:bg-red-500" />
                {issue}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CalendarMonthlySummary;
