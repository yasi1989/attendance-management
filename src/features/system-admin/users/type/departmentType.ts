export type DepartmentType = {
  id: string;
  companyId: string;
  departmentName: string;
  parentDepartmentId?: string;
  createdAt: Date;
  updatedAt: Date;
};
