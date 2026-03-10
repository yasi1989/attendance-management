import { Department, PublicUser } from '@/lib/actionTypes';

export type FetchDepartmentsDataResponse = {
  departments: Department[];
  users: PublicUser[];
};
