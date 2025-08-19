import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

type CommonPageHeaderProps = {
  title: string;
  description: string;
  icon?: React.ReactNode;
  actionDialog?: React.ReactNode;
};

const CommonPageHeader = ({ title, description, icon, actionDialog }: CommonPageHeaderProps) => {
  return (
    <CardHeader className="border-b border-slate-200/30 dark:border-slate-700/30 bg-gradient-to-r from-slate-50/90 to-blue-50/90 dark:from-slate-800/90 dark:to-indigo-900/90 backdrop-blur-sm flex items-center justify-between px-6 py-6 transition-all duration-300">
      <div className="flex items-center space-x-3">
        <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
          {icon}
        </div>
        <div>
          <CardTitle className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{title}</CardTitle>
          <CardDescription className="text-sm text-slate-600 dark:text-slate-400 mt-1">{description}</CardDescription>
        </div>
      </div>
      {actionDialog}
    </CardHeader>
  );
};

export default CommonPageHeader;