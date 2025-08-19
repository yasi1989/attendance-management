import { companies } from '../const/mockData';
import { CompanyType } from '../type/companyType';

export const fetchCompanies = async (): Promise<CompanyType[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return companies;
};
