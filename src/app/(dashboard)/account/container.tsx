import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { URLS } from '@/consts/urls';
import { getUser } from '@/lib/user';
import AccountPresentational from './presentational';

const AccountContainer = async () => {
  const session = await auth();
  if (!session?.user?.id) redirect(URLS.LOGIN);

  const userResult = await getUser(session.user.id);
  if (!userResult.success) {
    console.error('[AccountContainer]', userResult.error);
    redirect(URLS.LOGIN);
  }

  return (
    <AccountPresentational
      navUser={{
        name: userResult.data.name,
        email: userResult.data.email,
        avatar: userResult.data.image ?? '',
      }}
    />
  );
};

export default AccountContainer;
