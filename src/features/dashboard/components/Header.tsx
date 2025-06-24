'use client';

import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';
import { Clock, Briefcase } from 'lucide-react';
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

  const getPageTitle = (currentPath: string) => {
    if (currentPath === '/') {
      return 'ダッシュボード';
    }

    for (const mainItem of data.navMain) {
      if (mainItem.url === currentPath) {
        return mainItem.title;
      }

      if (mainItem.items) {
        for (const subItem of mainItem.items) {
          if (subItem.url === currentPath) {
            return subItem.title;
          }
        }
      }
    }

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
    <header className="flex h-14 shrink-0 items-center gap-2 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 transition-[width,height] ease-linear sticky top-0 z-50">
      <div className="flex w-full items-center justify-between gap-4 px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <SidebarTrigger className="-ml-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors p-1.5 rounded" />
          <Separator orientation="vertical" className="h-5 mx-1 bg-gray-300 dark:bg-gray-600" />
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            <div className="flex flex-col">
              <h1 className="text-base font-semibold text-gray-900 dark:text-gray-100">{pageTitle}</h1>
              {breadcrumb && <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">{breadcrumb}</p>}
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
            <Clock className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            <div className="flex flex-col items-center">
              <span className="text-sm font-mono font-medium text-gray-900 dark:text-gray-100">
                {currentTime.toLocaleTimeString('ja-JP', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {currentTime.toLocaleDateString('ja-JP', {
                  month: 'numeric',
                  day: 'numeric',
                  weekday: 'short',
                })}
              </span>
            </div>
          </div>

          <div
            className={`flex items-center gap-2 px-3 py-1.5 border rounded text-sm ${
              headerIsWorking
                ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300'
                : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full ${
                headerIsWorking ? 'bg-green-500 dark:bg-green-400' : 'bg-gray-400 dark:bg-gray-500'
              }`}
            />
            <span className="font-medium">{headerIsWorking ? '勤務中' : '退勤中'}</span>
            {headerWorkStartTime && headerIsWorking && <span className="text-xs">({headerWorkStartTime}〜)</span>}
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
