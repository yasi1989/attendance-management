import { fetchCompanies } from '@/features/system/companies/api/fetches';
import CompaniesPresentational from './presentational';

const CompaniesContainer = async () => {
  const result = await fetchCompanies();
  if (!result.success) throw result.error;

  return <CompaniesPresentational companies={result.data} />;
};

export default CompaniesContainer;