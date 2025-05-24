import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import CompanyCodeTable from './CompanyCodeTable';
import { CompanyType } from '../type/companyType';
import { CompanyCodeDialog } from './CompanyCodeDialog';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

type CreateCompanyCodeFormProps = {
  data: CompanyType[];
};

const CreateCompanyCodeForm = ({ data }: CreateCompanyCodeFormProps) => {
  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="border-b bg-muted/20">
        <CardTitle className="text-xl">会社管理</CardTitle>
        <CardDescription>登録されている会社コードを確認・管理できます。</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-start">
          <CompanyCodeDialog type="add">
            <Button className="flex items-center gap-2 whitespace-nowrap self-start sm:self-center">
              <PlusCircle size={18} />
              会社コード登録
            </Button>
          </CompanyCodeDialog>
        </div>
        <div className="overflow-x-auto">
          <CompanyCodeTable data={data} />
        </div>
      </CardContent>
    </Card>
  );
};

export default CreateCompanyCodeForm;
