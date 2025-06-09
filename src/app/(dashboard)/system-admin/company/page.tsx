import { fetchCompany } from '@/features/system-admin/company/services/fetchCompany';
import CompaniesForm from '@/features/system-admin/company/components/CompaniesForm';

const page = () => {
  const companies = fetchCompany();
  return <CompaniesForm companies={companies} />;
};

export default page;
