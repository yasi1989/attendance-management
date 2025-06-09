import { sampleCompanies } from '../const/mockData';
import { CompanyType } from '../type/companyType';

export const fetchCompany = (): CompanyType[] => {
  return sampleCompanies;
};
