import EmployeesForm from "@/features/company-admin/employees/components/EmployeesForm";
import { fetchEmployees } from "@/features/company-admin/employees/services/fetchEmployees";

const EmployeesPage = () => {
  const { users, departments, roles } = fetchEmployees();
  return <EmployeesForm users={users} departments={departments} roles={roles} />;
};

export default EmployeesPage