import { companies } from '../../company/const/mockData';
import { roles, users } from '../const/mockData';

export const fetchUsersData = () => {
  return {
    users,
    companies,
    roles,
  };
};
