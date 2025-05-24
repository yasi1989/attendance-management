import { DataTable } from '@/components/DataTable';
import { companyCodeColumns } from './CompanyCodeColumns';
import { CompanyType } from '../type/companyType';

type CompanyCodeTableProps = {
  data: CompanyType[];
};

const CompanyCodeTable = ({ data }: CompanyCodeTableProps) => {
  return <DataTable columns={companyCodeColumns} data={data} />;
};

export default CompanyCodeTable;
