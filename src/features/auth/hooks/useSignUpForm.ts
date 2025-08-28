import { useForm } from 'react-hook-form';
import { SignUpSchema } from '@/features/auth/lib/formSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import { useTransition } from 'react';
// cspell:disable-next-line
import { toast } from 'sonner';
import { signUpAction } from '../services/signUpAction';
import { useRouter } from 'next/navigation';
import { URLS } from '@/consts/urls';

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
      if (!result.success) {
        toast.error(result.error);
        return;
      }

      toast.success('新規登録に成功しました。');
      router.push(URLS.ATTENDANCE_CALENDAR);
      router.refresh();
    });
  };
  return { form, onSubmit, isPending };
};
