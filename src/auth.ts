import NextAuth from 'next-auth';
import { config } from '@/features/auth/config/auth.config';

export const { handlers, auth, signIn, signOut } = NextAuth(config);
