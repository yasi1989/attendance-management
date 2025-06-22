import { DataTable } from '@/components/DataTable';
import { companyColumns } from './CompaniesColumns';
import { CompanyType } from '../type/companyType';

type CompaniesListTableProps = {
  companies: CompanyType[];
};

const CompaniesListTable = ({ companies }: CompaniesListTableProps) => {
  return <DataTable columns={companyColumns} data={companies} enableFilter />;
};

export default CompaniesListTable;
