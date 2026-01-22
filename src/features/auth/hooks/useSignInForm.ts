import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
// cspell:disable-next-line
import { toast } from 'sonner';
import type { z } from 'zod';
import { SignInSchema } from '@/features/auth/lib/formSchema';
import { signInAction } from '../services/signInAction';

export const useSignInForm = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = (data: z.infer<typeof SignInSchema>) => {
    startTransition(async () => {
      const result = await signInAction(data);
      if (!result.isSuccess) {
        toast.error(result.error?.message);
        return;
      }

      router.push(result.data?.redirectUrl || '/');
      router.refresh();
      toast.success('ログインに成功しました。');
    });
  };
  return { form, onSubmit, isPending };
};
