import { Company, Department, PublicUser, Role } from '@/lib/actionTypes';

export type UserWithRelations = PublicUser & {
  company: Company | null;
  department: Department | null;
  role: Role | null;
};

export type FetchUsersDataResponse = {
  usersData: UserWithRelations[];
  companies: Company[];
  roles: Role[];
};
