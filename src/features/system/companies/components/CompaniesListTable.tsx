import { DataTable } from '@/components/table/DataTable';
import { companyColumns } from '../table/CompaniesColumns';
import { CompanyType } from '../type/companyType';

type CompaniesListTableProps = {
  companies: CompanyType[];
};

const CompaniesListTable = ({ companies }: CompaniesListTableProps) => {
  return <DataTable columns={companyColumns} data={companies} enableFilter />;
};

export default CompaniesListTable;
