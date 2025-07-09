import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const HolidaysSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center space-x-3">
            <Skeleton className="w-12 h-12 rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-7 w-24" />
              <Skeleton className="h-4 w-56" />
            </div>
          </div>

          <Skeleton className="h-10 w-28 rounded-lg" />
        </div>

        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-white/80 to-blue-50/50 border-b border-gray-100/50 px-6 py-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Skeleton className="w-2 h-8 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Skeleton className="w-2 h-2 rounded-full" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <div className="relative">
              <div className="relative bg-white/50 backdrop-blur-sm p-6">
                <div className="grid grid-cols-4 gap-4 mb-4 pb-3 border-b border-gray-100">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-4 w-16" />
                </div>

                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index.toString()} className="grid grid-cols-4 gap-4 py-3 border-b border-gray-50/50">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <div className="flex space-x-2">
                      <Skeleton className="h-8 w-8 rounded" />
                      <Skeleton className="h-8 w-8 rounded" />
                    </div>
                  </div>
                ))}

                <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                  <Skeleton className="h-4 w-32" />
                  <div className="flex space-x-2">
                    <Skeleton className="h-8 w-8 rounded" />
                    <Skeleton className="h-8 w-8 rounded" />
                    <Skeleton className="h-8 w-8 rounded" />
                    <Skeleton className="h-8 w-8 rounded" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HolidaysSkeleton;
