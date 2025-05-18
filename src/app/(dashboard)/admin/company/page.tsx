import CreateCompanyCodeForm from '@/features/admin/company/components/CreateCompanyCodeForm';
import { fetchCompanyCode } from '@/features/admin/company/services/fetcnCompanyCode';

const page = () => {
  const companyCodes = fetchCompanyCode();
  return <CreateCompanyCodeForm data={companyCodes} />;
};

export default page;
