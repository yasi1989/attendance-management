import { db } from '@/lib/db/drizzle';
import { accounts } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { findUserByEmail, findUserById } from '../adapter/adapterHelpers';
import { URL_PARAMS, URLS } from '@/consts/urls';
import { AUTH_ERROR_CODES } from '../const/authErrorConst';

export interface OAuthSignInValidation {
  isValid: boolean;
  errorUrl?: string;
}

export const validateOAuthSignIn = async (email: string, provider: string): Promise<OAuthSignInValidation> => {
  const existingUser = await findUserByEmail(email);

  if (!existingUser) {
    return { isValid: true };
  }

  if (existingUser.hashedPassword) {
    return {
      isValid: false,
      errorUrl: `${URLS.AUTH_ERROR}?${URL_PARAMS.auth.EXISTING_PROVIDER}=${AUTH_ERROR_CODES.PASSWORD_ACCOUNT_EXISTS}`,
    };
  }

  const existingAccount = await db.query.accounts.findFirst({
    where: eq(accounts.userId, existingUser.id),
  });

  if (existingAccount && existingAccount.provider !== provider) {
    return {
      isValid: false,
      errorUrl: `${URLS.AUTH_ERROR}?${URL_PARAMS.auth.EXISTING_PROVIDER}=${AUTH_ERROR_CODES.OAUTH_ACCOUNT_EXISTS}&${URL_PARAMS.auth.EXISTING_PROVIDER}=${existingAccount.provider}`,
    };
  }

  return { isValid: true };
};

export const validateCredentialsSignIn = async (userId: string): Promise<boolean> => {
  if (!userId) return false;

  const user = await findUserById(userId);
  return !!user;
};
