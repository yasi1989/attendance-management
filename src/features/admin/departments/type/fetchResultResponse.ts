import { Department, User } from '@/lib/actionTypes';

export type FetchDepartmentsDataResponse = {
  departments: Department[];
  users: User[];
};
