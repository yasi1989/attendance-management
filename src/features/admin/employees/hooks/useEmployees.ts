import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { EmployeeSchema } from '../lib/formSchema';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserType } from '@/features/system/users/type/userType';
type UseEmployeeProps = {
  user: UserType;
};

export const useEmployee = ({ user }: UseEmployeeProps) => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof EmployeeSchema>>({
    defaultValues: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      departmentId: user.departmentId,
      roleId: user.roleId,
    },
    resolver: zodResolver(EmployeeSchema),
  });
  const onSubmit = (data: z.infer<typeof EmployeeSchema>) => {
    startTransition(() => {
      console.log(data);
    });
  };
  return { form, onSubmit, isPending };
};
