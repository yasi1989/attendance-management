import { fetchEmployees } from '@/features/admin/employees/services/fetchEmployees';
import EmployeesPresentational from './presentational';

const EmployeesContainer = async () => {
  const { users, departments, roles } = await fetchEmployees();
  return <EmployeesPresentational users={users} departments={departments} roles={roles} />;
};

export default EmployeesContainer;
