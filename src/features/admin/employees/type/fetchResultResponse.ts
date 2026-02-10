import { Department, Role, User } from '@/lib/actionTypes';

export type FetchEmployeesDataResponse = {
  users: User[];
  departments: Department[];
  roles: Role[];
};
