import CompanyCodeForm from '@/features/system-admin/company/components/CompanyCodeForm';
import { fetchCompanyCode } from '@/features/system-admin/company/services/fetchCompanyCode';

const page = () => {
  const companyCodes = fetchCompanyCode();
  return <CompanyCodeForm data={companyCodes} />;
};

export default page;
