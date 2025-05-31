import { sampleCompanyCodes } from '../const/mockData';
import { CompanyType } from '../type/companyType';

export const fetchCompanyCode = (): CompanyType[] => {
  return sampleCompanyCodes;
};
