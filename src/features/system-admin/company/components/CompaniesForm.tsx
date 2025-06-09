import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import CompanyCodeTable from './CompaniesListTable';
import { CompanyType } from '../type/companyType';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { UpsertCompanyDialog } from './UpsertCompanyDialog';

type CompaniesFormProps = {
  companies: CompanyType[];
};

const CompaniesForm = ({ companies }: CompaniesFormProps) => {
  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="border-b bg-muted/20">
        <CardTitle className="text-xl">会社管理</CardTitle>
        <CardDescription>登録されている会社を確認・管理できます。</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-start">
          <UpsertCompanyDialog type="add">
            <Button className="flex items-center gap-2 whitespace-nowrap self-start sm:self-center">
              <PlusCircle size={18} />
              会社登録
            </Button>
          </UpsertCompanyDialog>
        </div>
        <div className="overflow-x-auto">
          <CompanyCodeTable companies={companies} />
        </div>
      </CardContent>
    </Card>
  );
};

export default CompaniesForm;
