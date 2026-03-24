import { Card, CardContent } from '@/components/ui/card';

const CalendarSkeleton = () => {
  return (
    <div className="space-y-2 mx-4">
      <Card className="border-0 shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl overflow-hidden rounded-2xl ring-1 ring-gray-200/50 dark:ring-gray-800/50">
        <div className="border-b border-slate-200/30 dark:border-slate-700/30 bg-linear-to-r from-slate-50/90 to-blue-50/90 dark:from-slate-800/90 dark:to-indigo-900/90 backdrop-blur-sm px-4 pt-4 pb-3">
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 bg-blue-200 dark:bg-blue-800 rounded-lg animate-pulse shrink-0" />
              <div className="space-y-2 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="w-32 h-6 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                  <div className="w-20 h-5 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse" />
                </div>
                <div className="w-64 h-4 bg-slate-200 dark:bg-slate-600 rounded animate-pulse" />
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <div className="w-28 h-8 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse" />
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                <div className="w-8 h-7 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                <div className="w-14 h-7 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                <div className="w-8 h-7 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        <CardContent className="p-0">
          <div className="grid grid-cols-7">
            {Array.from({ length: 7 }, (_, i) => (
              <div
                key={i.toString()}
                className="py-4 border border-gray-200/50 dark:border-gray-700/50 last:border-r-0 bg-gray-50 dark:bg-gray-800/30"
              >
                <div className="w-10 h-5 bg-gray-300 dark:bg-gray-600 rounded mx-auto animate-pulse" />
              </div>
            ))}

            {Array.from({ length: 35 }, (_, i) => (
              <div
                key={i.toString()}
                className="relative h-24 sm:h-28 lg:h-32 p-2 sm:p-3 border border-gray-200/50 dark:border-gray-700/50 last:border-r-0 space-y-1"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="w-6 h-5 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="w-3 h-3 bg-gray-200 dark:bg-gray-600 rounded-full animate-pulse" />
                </div>
                <div className="w-10 h-3.5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </CardContent>

        <div className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/30 px-6 py-4">
          <div className="flex flex-wrap items-center justify-center gap-6 w-full">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i.toString()} className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
                <div className="w-14 h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div className="space-y-2 mx-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-violet-200 dark:bg-violet-800 rounded-lg animate-pulse shrink-0" />
          <div className="w-32 h-5 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {Array.from({ length: 4 }, (_, i) => (
            <div
              key={i.toString()}
              className="flex items-center gap-3 p-4 rounded-xl border border-gray-200/60 dark:border-gray-700/60 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm"
            >
              <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse shrink-0" />
              <div className="space-y-2 flex-1 min-w-0">
                <div className="w-16 h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="w-20 h-6 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-xl border border-gray-200/60 dark:border-gray-700/60 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-emerald-200 dark:bg-emerald-800 rounded animate-pulse" />
                <div className="w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>
              <div className="w-10 h-6 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
            </div>
            <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full w-3/4 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
            </div>
            <div className="w-24 h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>

          <div className="p-4 rounded-xl border border-gray-200/60 dark:border-gray-700/60 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-200 dark:bg-blue-800 rounded animate-pulse" />
              <div className="w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>
            <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden flex">
              <div className="h-full w-3/5 bg-gray-200 dark:bg-gray-700 animate-pulse" />
              <div className="h-full w-2/5 bg-gray-300 dark:bg-gray-600 animate-pulse" />
            </div>
            <div className="flex justify-between">
              <div className="w-16 h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="w-14 h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>
          </div>

          <div className="p-4 rounded-xl border border-gray-200/60 dark:border-gray-700/60 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm space-y-2">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-violet-200 dark:bg-violet-800 rounded animate-pulse" />
                <div className="w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>
              <div className="w-8 h-5 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
            </div>
            <div className="space-y-1.5">
              {Array.from({ length: 3 }, (_, i) => (
                <div key={i.toString()} className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse shrink-0" />
                    <div className="w-14 h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  </div>
                  <div className="w-8 h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarSkeleton;
