export type DepartmentType = {
  id: string;
  companyId: string;
  departmentName: string;
  parentDepartmentId?: string;
  level: number;
  createdAt: Date;
  updatedAt: Date;
};
