export type DepartmentType = {
  id: string;
  companyId: string;
  departmentCode: string;
  departmentName: string;
  parentDepartmentId?: string;
  createdAt: Date;
  updatedAt: Date;
};
