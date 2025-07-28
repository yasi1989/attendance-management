'use server';
import { signOut } from '@/auth';

const signOutAction = async () => {
  await signOut({
    redirectTo: '/login',
  });
};

export default signOutAction;
