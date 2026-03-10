import { Department, PublicUser, Role } from '@/lib/actionTypes';

export type FetchEmployeesDataResponse = {
  users: PublicUser[];
  departments: Department[];
  roles: Role[];
};
