import { useForm } from 'react-hook-form';
import { SignInSchema, SignUpSchema } from '@/features/auth/lib/formSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import { useTransition } from 'react';

export const useSignInForm = () => {
  const [isSubmitted, startTransition] = useTransition();
  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = (data: z.infer<typeof SignInSchema>) => {
    startTransition(async () => {
      console.log(data);
    });
  };
  return { form, onSubmit, isSubmitted };
};

export const useSignUpForm = () => {
  const [isSubmitted, startTransition] = useTransition();
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
      console.log(data);
    });
  };
  return { form, onSubmit, isSubmitted };
};
