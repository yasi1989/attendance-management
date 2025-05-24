export type DepartmentType = {
  id: string;
  companyId: string;
  departmentCode: string;
  departmentName: string;
  parentDepartmentId: string;
  managerUserId: string;
  level: number;
  createdAt: Date;
  updatedAt: Date;
};
