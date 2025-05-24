export type UserType = {
  id: string;
  employeeCode: string;
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
