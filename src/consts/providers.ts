import { faGithub, faGoogle, IconDefinition } from '@fortawesome/free-brands-svg-icons';

export const SOCIAL_PROVIDERS: { id: string; name: string; icon: IconDefinition }[] = [
  {
    id: 'github',
    name: 'GitHub',
    icon: faGithub,
  },
  {
    id: 'google',
    name: 'Google',
    icon: faGoogle,
  },
] as const;
