import { Card, CardContent } from '@/components/ui/card';
import CompaniesListTable from '@/features/system/companies/components/CompaniesListTable';
import { CompanyType } from '@/features/system/companies/type/companyType';
import { UpsertCompanyDialog } from '@/features/system/companies/components/UpsertCompanyDialog';
import CommonPageHeader from '@/components/layout/CommonPageHeader';
import { Building2 } from 'lucide-react';
import { AddButton } from '@/components/button/AddButton';

type CompaniesPresentationalProps = {
  companies: CompanyType[];
};

const CompaniesPresentational = ({ companies }: CompaniesPresentationalProps) => {
  return (
    <Card className="shadow-2xl border-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl ring-1 ring-slate-200/50 dark:ring-slate-800/50 overflow-hidden">
      <CommonPageHeader
        title="テナント管理"
        description="登録されているテナントを確認・管理できます"
        icon={<Building2 className="w-6 h-6 text-white" />}
        actionDialog={
          <UpsertCompanyDialog type="add">
            <AddButton label="テナント登録" />
          </UpsertCompanyDialog>
        }
      />

      <CardContent className="bg-gradient-to-b from-white/80 to-slate-50/80 dark:from-slate-900/80 dark:to-slate-800/80 backdrop-blur-sm border-t border-slate-200/30 dark:border-slate-700/30 p-6 space-y-6">
        <div className="overflow-x-auto">
          <CompaniesListTable companies={companies} />
        </div>
      </CardContent>
    </Card>
  );
};

export default CompaniesPresentational;
