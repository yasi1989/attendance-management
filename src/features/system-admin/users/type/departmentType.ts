export type DepartmentType = {
  id: string;
  companyId: string;
  departmentCode: string;
  departmentName: string;
  parentDepartmentId?: string;
  level: number;
  createdAt: Date;
  updatedAt: Date;
};
