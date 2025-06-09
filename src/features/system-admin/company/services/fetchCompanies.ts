import { CompanyType } from '../type/companyType';
import { companies } from '../const/mockData';

export const fetchCompanies = (): CompanyType[] => {
  return companies;
};
