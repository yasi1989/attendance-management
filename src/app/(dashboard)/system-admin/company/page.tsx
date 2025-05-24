import CreateCompanyCodeForm from '@/features/system-admin/company/components/CreateCompanyCodeForm';
import { fetchCompanyCode } from '@/features/system-admin/company/services/fetchCompanyCode';

const page = () => {
  const companyCodes = fetchCompanyCode();
  return <CreateCompanyCodeForm data={companyCodes} />;
};

export default page;
