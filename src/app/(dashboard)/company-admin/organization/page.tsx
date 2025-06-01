import OrganizationsForm from '@/features/company-admin/organization/components/OrganizationsForm';
import { fetchOrganizations } from '@/features/company-admin/organization/services/fetchOrganizations';

const OrganizationPage = () => {
  const organizations = fetchOrganizations();
  return <OrganizationsForm data={organizations} />;
};

export default OrganizationPage;
