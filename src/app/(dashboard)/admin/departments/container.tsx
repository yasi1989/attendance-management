import { fetchDepartments } from '@/features/admin/departments/api/fetches';
import DepartmentsPresentational from './presentational';

const DepartmentsContainer = async () => {
  const { departments, users } = await fetchDepartments();
  return <DepartmentsPresentational departments={departments} users={users} />;
};

export default DepartmentsContainer;
