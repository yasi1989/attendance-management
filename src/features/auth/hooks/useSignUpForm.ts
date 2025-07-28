import { useForm } from 'react-hook-form';
import { SignUpSchema } from '@/features/auth/lib/formSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import { useTransition } from 'react';
// cspell:disable-next-line
import { toast } from 'sonner';
import { signUpAction } from '../services/signUpAction';
import { useRouter } from 'next/navigation';

export const useSignUpForm = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });
  const onSubmit = (data: z.infer<typeof SignUpSchema>) => {
    startTransition(async () => {
      const result = await signUpAction(data);
      if (!result.isSuccess) {
        toast.error(result.error?.message);
        return;
      }

      toast.success('新規登録に成功しました。');
      router.push(result.data?.redirectUrl || '/');
      router.refresh();
    });
  };
  return { form, onSubmit, isPending };
};
