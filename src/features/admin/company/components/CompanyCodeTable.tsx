import { DataTable } from '@/components/DataTable';
import { companyCodeColumns } from './CompanyCodeColumns';
import { filterCompanyCodeColumns } from '../const/filterCompanyCodeColumns';
import { CompanyType } from '../type/companyType';

type CompanyCodeTableProps = {
  data: CompanyType[];
};

const CompanyCodeTable = ({ data }: CompanyCodeTableProps) => {
  return <DataTable columns={companyCodeColumns} data={data} filterableColumns={filterCompanyCodeColumns} />;
};

export default CompanyCodeTable;
