import { faGithub, faGoogle, IconDefinition } from '@fortawesome/free-brands-svg-icons';

export const PROVIDER_TYPES: Record<string, string> = {
  PASSWORD: 'password',
  GITHUB: 'github',
  GOOGLE: 'google',
} as const;

export const SOCIAL_PROVIDERS: {
  id: (typeof PROVIDER_TYPES)[keyof typeof PROVIDER_TYPES];
  name: string;
  icon: IconDefinition;
}[] = [
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

export const getProviderName = (providerType: (typeof PROVIDER_TYPES)[keyof typeof PROVIDER_TYPES]) => {
  switch (providerType) {
    case PROVIDER_TYPES.GITHUB:
      return 'GitHub';
    case PROVIDER_TYPES.GOOGLE:
      return 'Google';
    case PROVIDER_TYPES.PASSWORD:
      return 'メール＋パスワード';
    default:
      return providerType;
  }
};

export const getAlreadyRegisteredMessage = (providerType: (typeof PROVIDER_TYPES)[keyof typeof PROVIDER_TYPES]) => {
  const providerName = getProviderName(providerType);
  return {
    error: `このメールアドレスは既に${providerName}で登録されています`,
    message: `${providerName}でログインしていただくか、または別のメールアドレスで登録してください`,
    existingMethods: providerType,
  };
};
