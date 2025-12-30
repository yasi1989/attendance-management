import { getProviderName } from '@/consts/providers';
import { db } from '@/lib/db/drizzle';
import { accounts } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export interface LinkedAccountInfo {
  hasLinkedAccounts: boolean;
  providerNames: string[];
  providers: string[];
}

export const getLinkedAccounts = async (userId: string): Promise<LinkedAccountInfo> => {
  const linkedAccounts = await db.query.accounts.findMany({
    where: eq(accounts.userId, userId),
  });

  if (linkedAccounts.length === 0) {
    return { hasLinkedAccounts: false, providerNames: [], providers: [] };
  }

  const providers = linkedAccounts.map((acc) => acc.provider);
  const providerNames = providers.map((provider) => getProviderName(provider));

  return {
    hasLinkedAccounts: true,
    providerNames,
    providers,
  };
};

export const createLinkedAccountErrorMessage = (providerNames: string[]): string => {
  return `このメールアドレスは${providerNames.join(', ')}で登録されています。そちらでログインしてください。`;
};
