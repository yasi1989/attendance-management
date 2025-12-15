import type { Account, User, Profile } from 'next-auth';
import type { AdapterUser } from 'next-auth/adapters';
import { validateCredentialsSignIn, validateOAuthSignIn } from './signInCallbackHelpers';

interface SignInCallbackParams {
  user: User | AdapterUser;
  account?: Account | null;
  profile?: Profile;
  email?: { verificationRequest?: boolean };
  credentials?: Record<string, unknown>;
}

export const signInCallback = async ({ user, account }: SignInCallbackParams): Promise<boolean | string> => {
  if (!account) {
    return false;
  }

  if (account.provider !== 'credentials') {
    if (!user.email || !account.provider) {
      return false;
    }

    const validation = await validateOAuthSignIn(user.email, account.provider);

    if (!validation.isValid && validation.errorUrl) {
      return validation.errorUrl;
    }

    return validation.isValid;
  }

  if (account.provider === 'credentials') {
    if (!user.id) {
      return false;
    }

    return validateCredentialsSignIn(user.id);
  }

  return true;
};
