import type { Session } from 'next-auth';
import type { JWT } from 'next-auth/jwt';

export const sessionCallback = ({ session, token }: { session: Session; token: JWT }): Session => {
  if (!session.user) {
    session.user = {};
  }

  if (token.sub) {
    session.user.id = token.sub;
  }

  return session;
};
