import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@/components/ui/button';
import { startTransition } from 'react';
import { signIn } from 'next-auth/react';
import { SOCIAL_PROVIDERS } from '@/consts/providers';
import { URLS } from '@/consts/urls';

const SocialLoginForm = () => {
  return (
    <div className="grid grid-cols-2 gap-3">
      {SOCIAL_PROVIDERS.map((provider) => (
        <Button
          key={provider.id}
          variant="outline"
          type="button"
          className="cursor-pointer h-11 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200 hover:scale-[1.02]"
          onClick={() => {
            startTransition(async () => {
              await signIn(provider.id);
            });
          }}
        >
          <FontAwesomeIcon icon={provider.icon} className="mr-2 h-4 w-4" />
          {provider.name}
        </Button>
      ))}
    </div>
  );
};

export default SocialLoginForm;
