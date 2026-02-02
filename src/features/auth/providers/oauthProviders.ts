import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import { env } from '@/env';

export const githubProvider = GitHub({
  clientId: env.AUTH_GITHUB_ID,
  clientSecret: env.AUTH_GITHUB_SECRET,
});

export const googleProvider = Google({
  clientId: env.AUTH_GOOGLE_ID,
  clientSecret: env.AUTH_GOOGLE_SECRET,
});

export const oauthProviders = [githubProvider, googleProvider] as const;
