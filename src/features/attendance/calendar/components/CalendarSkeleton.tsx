import { Card, CardContent } from '@/components/ui/card';

const CalendarSkeleton = () => {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-transparent to-purple-50/20 dark:from-blue-950/10 dark:to-purple-950/10 rounded-3xl -z-10" />

      <Card className="border-0 shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl overflow-hidden rounded-2xl ring-1 ring-gray-200/50 dark:ring-gray-800/50">
        <div className="bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-950/20 dark:to-purple-950/20 border-b border-gray-200/50 dark:border-gray-800/50 px-8 py-8">
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-gray-300 dark:bg-gray-700 rounded-2xl animate-pulse" />
              <div className="space-y-3">
                <div className="w-48 h-8 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
                <div className="w-32 h-6 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-32 h-12 bg-gray-300 dark:bg-gray-700 rounded-xl animate-pulse" />
              <div className="w-40 h-12 bg-gray-300 dark:bg-gray-700 rounded-2xl animate-pulse" />
            </div>
          </div>
        </div>

        <CardContent className="p-0">
          <div className="grid grid-cols-7">
            {Array.from({ length: 7 }, (_, i) => (
              <div
                key={i.toString()}
                className="py-4 border-r border-b border-gray-200 dark:border-gray-800 last:border-r-0"
              >
                <div className="w-16 h-6 bg-gray-300 dark:bg-gray-700 rounded mx-auto animate-pulse" />
              </div>
            ))}

            {Array.from({ length: 42 }, (_, i) => (
              <div
                key={i.toString()}
                className="h-28 sm:h-32 lg:h-36 border-r border-b border-gray-200 dark:border-gray-800 last:border-r-0 p-3"
              >
                <div className="space-y-2">
                  <div className="w-8 h-6 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
                  <div className="w-12 h-4 bg-gray-200 dark:bg-gray-600 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>

        <div className="border-t border-gray-200 dark:border-gray-800 px-8 py-6">
          <div className="flex justify-center gap-6">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i.toString()} className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
                <div className="w-16 h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CalendarSkeleton;
