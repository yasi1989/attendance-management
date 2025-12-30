import type { JWT } from 'next-auth/jwt';
import { findUserById } from '../adapter/adapterHelpers';

export const jwtCallback = async ({ token }: { token: JWT }): Promise<JWT> => {
  if (!token.sub) return token;

  const existingUser = await findUserById(token.sub);

  if (!existingUser) return token;

  token.name = existingUser.name;
  token.email = existingUser.email;
  token.image = existingUser.image;

  return token;
};
