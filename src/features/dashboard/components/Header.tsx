'use client';

import { Clock } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { data } from '../const/sideMenuItems';

interface HeaderProps {
  clockSection: React.ReactNode;
}

const Header = ({ clockSection }: HeaderProps) => {
  const pathname = usePathname();
  const [currentTime, setCurrentTime] = useState(new Date());

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
                {currentTime.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {currentTime.toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric', weekday: 'short' })}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">{clockSection}</div>
      </div>
    </header>
  );
};

export default Header;
