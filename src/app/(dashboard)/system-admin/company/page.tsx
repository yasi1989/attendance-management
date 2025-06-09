import CompaniesForm from '@/features/system-admin/company/components/CompaniesForm';
import { fetchCompanies } from '@/features/system-admin/company/services/fetchCompanies';

const page = () => {
  const companies = fetchCompanies();
  return <CompaniesForm companies={companies} />;
};

export default page;
