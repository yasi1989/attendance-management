import { Company } from '@/lib/db/types';
import { companies } from '../../companies/const/mockData';
import { roles, users } from '../const/mockData';
import { RoleType } from '../type/roleType';
import { UserType } from '../type/userType';

type FetchUsersDataResponse = {
  users: UserType[];
  companies: Company[];
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
