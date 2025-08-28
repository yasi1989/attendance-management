import { Company, Department, Role, User } from '@/lib/actionTypes';

export type UserWithRelations = User & {
  company: Company | null;
  department: Department | null;
  role: Role | null;
};

export type FetchUsersDataResponse = {
  usersData: UserWithRelations[];
  allCompanies: Company[];
  allRoles: Role[];
};
