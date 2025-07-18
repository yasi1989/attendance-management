import { Card, CardContent } from '@/components/ui/card';
import CompaniesListTable from '@/features/system/companies/components/CompaniesListTable';
import { CompanyType } from '@/features/system/companies/type/companyType';
import { UpsertCompanyDialog } from '@/features/system/companies/components/UpsertCompanyDialog';
import AddButton from '@/components/AddButton';
import CommonPageHeader from '@/components/CommonPageHeader';
import { Building2 } from 'lucide-react';

type CompaniesPresentationalProps = {
  companies: CompanyType[];
};

const CompaniesPresentational = ({ companies }: CompaniesPresentationalProps) => {
  return (
    <Card className="shadow-lg border-0">
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

      <CardContent className="space-y-4">
        <div className="overflow-x-auto">
          <CompaniesListTable companies={companies} />
        </div>
      </CardContent>
    </Card>
  );
};

export default CompaniesPresentational;
