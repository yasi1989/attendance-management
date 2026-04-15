import { fetchEmployees } from '@/features/admin/employees/api/fetches';
import EmployeesPresentational from './presentational';

const EmployeesContainer = async () => {
  const result = await fetchEmployees();
  if (!result.success) throw result.error;

  const { users, departments, roles } = result.data;
  return <EmployeesPresentational users={users} departments={departments} roles={roles} />;
};

export default EmployeesContainer;