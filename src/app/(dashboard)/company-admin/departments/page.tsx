import DepartmentsForm from '@/features/company-admin/departments/components/DepartmentsForm';
import { fetchDepartments } from '@/features/company-admin/departments/services/fetchDepartments';

const DepartmentsPage = () => {
  const departments = fetchDepartments();
  return <DepartmentsForm departments={departments} />;
};

export default DepartmentsPage;
