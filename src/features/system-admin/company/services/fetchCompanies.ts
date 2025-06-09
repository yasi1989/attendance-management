import { companies } from '../const/mockData';
import { CompanyType } from '../type/companyType';

export const fetchCompanies = (): CompanyType[] => {
  return companies;
};