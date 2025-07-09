export type UserType = {
  id: string;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  companyId?: string;
  departmentId?: string;
  roleId: string;
  createdAt: Date;
  updatedAt: Date;
};
