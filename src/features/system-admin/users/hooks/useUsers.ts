import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { UserSchema } from '../lib/formSchema';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserType } from '../type/userType';

type UseUsersProps = {
  user?: UserType;
};

export const useUsers = ({ user }: UseUsersProps) => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof UserSchema>>({
    defaultValues:
      user
        ? {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            roleId: user.roleId,
            companyId: user.companyId,
          }
        : {
            id: '',
            firstName: '',
            lastName: '',
            roleId: '',
            companyId: '',
          },
    resolver: zodResolver(UserSchema),
  });
  const onSubmit = (data: z.infer<typeof UserSchema>) => {
    startTransition(() => {
      console.log(data);
    });
  };
  return { form, onSubmit, isPending };
};
