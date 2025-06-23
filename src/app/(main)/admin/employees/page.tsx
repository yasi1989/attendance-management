import EmployeesForm from "@/features/admin/employees/components/EmployeesForm";
import { fetchEmployees } from "@/features/admin/employees/services/fetchEmployees";

const EmployeesPage = () => {
  const { users, departments, roles } = fetchEmployees();
  return <EmployeesForm users={users} departments={departments} roles={roles} />;
};

export default EmployeesPage