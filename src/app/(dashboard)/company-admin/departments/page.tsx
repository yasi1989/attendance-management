import DepartmentsForm from '@/features/company-admin/departments/components/DepartmentsForm';
import { fetchDepartments } from '@/features/company-admin/departments/services/fetchDepartments';

const DepartmentsPage = () => {
  const { department, users } = fetchDepartments();
  return <DepartmentsForm departments={department} users={users} />;
};

export default DepartmentsPage;
