import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DepartmentType } from '@/features/system-admin/users/type/departmentType';
import { UpsertOrganizationDialog } from './UpdateOrganizationDialog';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import OrganizationsListTable from './OrganizationsListTable';

type OrganizationsFormProps = {
  data: DepartmentType[];
};

const OrganizationsForm = ({ data }: OrganizationsFormProps) => {
  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="border-b bg-muted/20">
        <CardTitle className="text-xl">部署・役職管理</CardTitle>
        <CardDescription>登録されている部署・役職を確認・管理できます。</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-start">
          <UpsertOrganizationDialog type="add" allDepartments={data}>
            <Button className="flex items-center gap-2 whitespace-nowrap self-start sm:self-center">
              <PlusCircle size={18} />
              部署・役職登録
            </Button>
          </UpsertOrganizationDialog>
        </div>
        <div className="overflow-x-auto">
          <OrganizationsListTable data={data} />
        </div>
      </CardContent>
    </Card>
  );
};

export default OrganizationsForm;
