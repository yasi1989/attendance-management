import { DataTable } from '@/components/table/DataTable';
<<<<<<< HEAD
import { companyColumns } from './CompaniesColumns';
import { Company } from '@/lib/actionTypes';
=======
import { companyColumns } from '../table/CompaniesColumns';
import { CompanyType } from '../type/companyType';
>>>>>>> main

type CompaniesListTableProps = {
  companies: Company[];
};

const CompaniesListTable = ({ companies }: CompaniesListTableProps) => {
  return <DataTable columns={companyColumns} data={companies} enableFilter />;
};

export default CompaniesListTable;
