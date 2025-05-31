import { companies } from '../const/mockData';
import { CompanyType } from '../type/companyType';

export const fetchCompanyCode = (): CompanyType[] => {
  return companies;
};
