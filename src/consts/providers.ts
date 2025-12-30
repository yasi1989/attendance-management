import { faGithub, faGoogle, type IconDefinition } from '@fortawesome/free-brands-svg-icons';

export const PROVIDER_TYPES = {
  PASSWORD: 'password',
  GITHUB: 'github',
  GOOGLE: 'google',
} as const;

export type ProviderType = (typeof PROVIDER_TYPES)[keyof typeof PROVIDER_TYPES];

export interface SocialProvider {
  id: ProviderType;
  name: string;
  icon: IconDefinition;
}

export const SOCIAL_PROVIDERS: readonly SocialProvider[] = [
  {
    id: PROVIDER_TYPES.GITHUB,
    name: 'GitHub',
    icon: faGithub,
  },
  {
    id: PROVIDER_TYPES.GOOGLE,
    name: 'Google',
    icon: faGoogle,
  },
] as const;

const PROVIDER_NAME_MAP: Record<ProviderType, string> = {
  [PROVIDER_TYPES.GITHUB]: 'GitHub',
  [PROVIDER_TYPES.GOOGLE]: 'Google',
  [PROVIDER_TYPES.PASSWORD]: 'メール＋パスワード',
};

export const getProviderName = (providerType: string): string => {
  return PROVIDER_NAME_MAP[providerType as ProviderType] ?? providerType;
};
