import DepartmentsForm from '@/features/admin/departments/components/DepartmentsForm';
import { fetchDepartments } from '@/features/admin/departments/services/fetchDepartments';

const DepartmentsPage = () => {
  const { department, users } = fetchDepartments();
  return <DepartmentsForm departments={department} users={users} />;
};

export default DepartmentsPage;
