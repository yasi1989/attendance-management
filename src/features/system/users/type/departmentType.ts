export type DepartmentType = {
  id: string;
  companyId: string;
  departmentName: string;
  parentDepartmentId?: string;
  managerUserId?: string;
  createdAt: Date;
  updatedAt: Date;
};