import { SELECT_EMPTY } from '@/consts/form';
import { Department } from '@/lib/actionTypes';

export const getDepartmentPath = (departments: Department[], departmentId?: string): string => {
  if (!departmentId) return SELECT_EMPTY.label;

  const department = departments.find((d) => d.id === departmentId);
  if (!department) return SELECT_EMPTY.label;

  if (!department.parentDepartmentId) return department.departmentName;

  const parentPath = getDepartmentPath(departments, department.parentDepartmentId);
  return `${parentPath} > ${department.departmentName}`;
};
