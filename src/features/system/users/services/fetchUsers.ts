import { companies } from '../../companies/const/mockData';
import { CompanyType } from '../../companies/type/companyType';
import { roles, users } from '../const/mockData';
import { RoleType } from '../type/roleType';
import { UserType } from '../type/userType';

type FetchUsersDataResponse = {
  users: UserType[];
  companies: CompanyType[];
  roles: RoleType[];
};

export const fetchUsersData = async (): Promise<FetchUsersDataResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return {
    users,
    companies,
    roles,
  };
};
