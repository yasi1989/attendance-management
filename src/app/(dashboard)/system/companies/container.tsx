
import { fetchCompanies } from '@/features/system/companies/services/fetchCompanies';
import CompaniesPresentational from './presentational';

const CompaniesContainer = async () => {
  const companies = await fetchCompanies();
  return <CompaniesPresentational companies={companies} />;
};

export default CompaniesContainer;
