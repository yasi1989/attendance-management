import { DataTable } from '@/components/table/DataTable';
import { companyColumns } from './CompaniesColumns';
import { Company } from '@/lib/db/types';

type CompaniesListTableProps = {
  companies: Company[];
};

const CompaniesListTable = ({ companies }: CompaniesListTableProps) => {
  return <DataTable columns={companyColumns} data={companies} enableFilter />;
};

export default CompaniesListTable;
