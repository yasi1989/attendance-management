import { fetchDepartments } from '@/features/admin/departments/api/fetches';
import DepartmentsPresentational from './presentational';

const DepartmentsContainer = async () => {
  const result = await fetchDepartments();
  if (!result.success) throw result.error;

  const { departments, users } = result.data;
  return <DepartmentsPresentational departments={departments} users={users} />;
};

export default DepartmentsContainer;