'use client';

import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';
import { Clock } from 'lucide-react';
import { data } from '../const/sideMenuItems';
import { AttendanceButton } from './AttendanceButton';
import { useState, useEffect } from 'react';

const Header = () => {
  const pathname = usePathname();
  const [currentTime, setCurrentTime] = useState(new Date());

  const [headerIsWorking, setHeaderIsWorking] = useState(false);
  const [headerWorkStartTime, setHeaderWorkStartTime] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getPageTitle = (currentPath: string): string => {
    if (currentPath === '/') return 'Dashboard';

    const mainItem = data.navMain.find((item) => item.url === currentPath);
    if (mainItem) return mainItem.title;

    const subItem = data.navMain.flatMap((item) => item.items || []).find((subItem) => subItem.url === currentPath);
    if (subItem) return subItem.title;

    const segment = currentPath.split('/').pop();
    return segment ? segment.charAt(0).toUpperCase() + segment.slice(1) : '';
  };

  const getBreadcrumb = (currentPath: string) => {
    const mainItem = data.navMain.find((item) => item?.items?.some((subItem) => subItem.url === currentPath));
    if (!mainItem) return null;
    const subItem = mainItem.items?.find((item) => item.url === currentPath);
    return subItem ? `${mainItem.title} / ${subItem.title}` : mainItem.title;
  };

  const pageTitle = getPageTitle(pathname);
  const breadcrumb = getBreadcrumb(pathname);

  const handleClockIn = (time: string) => {
    setHeaderIsWorking(true);
    setHeaderWorkStartTime(time);
    console.log('Header: 出勤処理完了', time);
  };

  const handleClockOut = (time: string) => {
    setHeaderIsWorking(false);
    setHeaderWorkStartTime(null);
    console.log('Header: 退勤処理完了', time);
  };

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 header-gradient sticky top-0 z-50 shadow-sm">
      <div className="flex w-full items-center justify-between gap-4 px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <SidebarTrigger className="-ml-1 hover:bg-blue-50/80 dark:hover:bg-slate-700/60 transition-all duration-200 p-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400" />
          <Separator orientation="vertical" className="h-5 mx-1 bg-slate-300/50 dark:bg-slate-600/50" />
          <div className="flex flex-col">
            <h1 className="text-base font-semibold text-slate-900 dark:text-slate-100">{pageTitle}</h1>
            {breadcrumb && <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">{breadcrumb}</p>}
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/80 dark:bg-slate-800/80 border border-slate-200/50 dark:border-slate-700/50 rounded-lg backdrop-blur-sm shadow-sm transition-all duration-200 hover:bg-white/90 dark:hover:bg-slate-800/90">
            <Clock className="h-4 w-4 text-slate-600 dark:text-slate-400" />
            <div className="flex flex-col items-center">
              <span className="text-sm font-mono font-medium text-slate-900 dark:text-slate-100">
                {currentTime.toLocaleTimeString('ja-JP', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {currentTime.toLocaleDateString('ja-JP', {
                  month: 'numeric',
                  day: 'numeric',
                  weekday: 'short',
                })}
              </span>
            </div>
          </div>

          <div
            className={`flex items-center gap-2 px-3 py-1.5 border rounded-lg text-sm backdrop-blur-sm shadow-sm transition-all duration-200 ${
              headerIsWorking
                ? 'bg-gradient-to-r from-green-50/90 to-emerald-50/90 dark:from-green-900/30 dark:to-emerald-900/30 border-green-200/50 dark:border-green-800/50 text-green-800 dark:text-green-300 hover:from-green-50 hover:to-emerald-50 dark:hover:from-green-900/40 dark:hover:to-emerald-900/40'
                : 'bg-gradient-to-r from-slate-50/90 to-gray-50/90 dark:from-slate-800/80 dark:to-gray-800/80 border-slate-200/50 dark:border-slate-700/50 text-slate-600 dark:text-slate-400 hover:from-slate-50 hover:to-gray-50 dark:hover:from-slate-800/90 dark:hover:to-gray-800/90'
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                headerIsWorking ? 'bg-green-500 dark:bg-green-400 shadow-sm' : 'bg-slate-400 dark:bg-slate-500'
              }`}
            />
            <span className="font-medium">{headerIsWorking ? '勤務中' : '退勤中'}</span>
            {headerWorkStartTime && headerIsWorking && <span className="text-xs opacity-80">({headerWorkStartTime}〜)</span>}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden lg:block">
            <AttendanceButton variant="desktop" onClockIn={handleClockIn} onClockOut={handleClockOut} />
          </div>

          <div className="lg:hidden">
            <AttendanceButton variant="mobile" onClockIn={handleClockIn} onClockOut={handleClockOut} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;