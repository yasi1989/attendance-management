'use server';
import { signOut } from '@/auth';
import { URLS } from '@/consts/urls';

const signOutAction = async () => {
  await signOut({
    redirectTo: URLS.LOGIN,
  });
};

export default signOutAction;
