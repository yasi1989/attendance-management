export const HeaderStatusBadgeSkeleton = () => {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 border rounded-lg text-sm backdrop-blur-sm shadow-sm">
      <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600 animate-pulse" />
      <div className="w-12 h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
      <div className="w-16 h-3 bg-slate-200 dark:bg-slate-700 rounded animate-pulse opacity-80" />
    </div>
  );
};
