import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { DepartmentType } from '@/features/system/users/type/departmentType';
import { DepartmentSchema } from '../lib/formSchema';

type UseDepartmentsProps = {
  type: 'add' | 'edit';
  userDepartment?: DepartmentType;
};

export const useDepartments = ({ type, userDepartment }: UseDepartmentsProps) => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof DepartmentSchema>>({
    defaultValues:
      type === 'edit' && userDepartment
        ? {
            departmentName: userDepartment.departmentName,
            parentDepartmentId: userDepartment.parentDepartmentId,
            managerUserId: userDepartment.managerUserId,
          }
        : {
            departmentName: '',
            parentDepartmentId: '',
            managerUserId: '',
          },
    resolver: zodResolver(DepartmentSchema),
  });
  const onSubmit = (data: z.infer<typeof DepartmentSchema>) => {
    startTransition(() => {
      console.log(data);
    });
  };
  return { form, onSubmit, isPending };
};
