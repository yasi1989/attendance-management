import { DataTable } from '@/components/table/DataTable';
import { Company } from '@/lib/actionTypes';
import { companyColumns } from '../table/CompaniesColumns';

type CompaniesListTableProps = {
  companies: Company[];
};

const CompaniesListTable = ({ companies }: CompaniesListTableProps) => {
  return <DataTable columns={companyColumns} data={companies} enableFilter />;
};

export default CompaniesListTable;
