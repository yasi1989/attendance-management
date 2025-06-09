import { DepartmentType } from "@/features/system-admin/users/type/departmentType";

export const getDepartmentPath = (departments: DepartmentType[], departmentId?: string): string => {
    if (!departmentId) return '未設定';
  
    const department = departments.find((d) => d.id === departmentId);
    if (!department) return '未設定';
  
    if (!department.parentDepartmentId) return department.departmentName;
  
    const parentPath = getDepartmentPath(departments, department.parentDepartmentId);
    return `${parentPath} > ${department.departmentName}`;
  };