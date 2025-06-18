import { sampleCompanies } from '../const/mockData';
import { CompanyType } from '../type/companyType';

export const fetchCompanies = (): CompanyType[] => {
  return sampleCompanies;
};
