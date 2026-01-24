import type { NextAuthConfig } from 'next-auth';
import { URLS } from '@/consts/urls';
import { env } from '@/env';
import { createCustomAdapter } from '../adapter/customAdapter';
import { jwtCallback } from '../callbacks/jwtCallback';
import { sessionCallback } from '../callbacks/sessionCallback';
import { signInCallback } from '../callbacks/signInCallback';
import { credentialsProvider } from '../providers/credentialsProvider';
import { oauthProviders } from '../providers/oauthProviders';

export const config = {
  adapter: createCustomAdapter(),

  callbacks: {
    signIn: signInCallback,
    session: sessionCallback,
    jwt: jwtCallback,
  },

  providers: [...oauthProviders, credentialsProvider],

  pages: {
    signIn: URLS.LOGIN,
    error: URLS.AUTH_ERROR,
  },

  trustHost: true,
  debug: process.env.NODE_ENV === 'development',
  session: { strategy: 'jwt' },
  secret: env.AUTH_SECRET,
} satisfies NextAuthConfig;
