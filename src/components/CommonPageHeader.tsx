import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Building } from 'lucide-react';

type CommonPageHeaderProps = {
  title: string;
  description: string;
  actionDialog?: React.ReactNode;
};

const CommonPageHeader = ({ title, description, actionDialog }: CommonPageHeaderProps) => {
  return (
    <CardHeader className="border-b bg-muted/20 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg">
          <Building className="w-6 h-6 text-white" />
        </div>
        <div>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </div>
      {actionDialog}
    </CardHeader>
  );
};

export default CommonPageHeader;
