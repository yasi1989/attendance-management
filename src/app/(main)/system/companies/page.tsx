import CompaniesForm from '@/features/system/companies/components/CompaniesForm';
import { fetchCompanies } from '@/features/system/companies/services/fetchCompanies';

const page = () => {
  const companies = fetchCompanies();
  return <CompaniesForm companies={companies} />;
};

export default page;
