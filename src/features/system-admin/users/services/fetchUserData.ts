import { roles } from '../const/mockData';
import { departments } from '../const/mockData';
import { users } from '../const/mockData';
import { company } from '../../company/const/mockData';

export const mockData = {
  company,
  roles,
  departments,
  users,
};

export const fetchUserData = () => {
  const userId = '550e8400-e29b-41d4-a716-446655440001';
  const user = users.find((user) => user.id === userId);
  if (!user) {
    throw new Error('User not found');
  }
  const role = mockData.roles.find((role) => role.id === user.roleId);
  if (!role) {
    throw new Error('Role not found');
  }
  const company = mockData.company.find((company) => company.id === user.companyId);
  const department = mockData.departments.find((department) => department.id === user.departmentId);
  return {
    user,
    company,
    department,
    role,
  };
};
