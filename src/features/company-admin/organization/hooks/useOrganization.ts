import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { OrganizationSchema } from '../lib/formSchema';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { DepartmentType } from '@/features/system-admin/users/type/departmentType';

type UseOrganizationProps = {
  type: 'add' | 'edit';
  userDepartment?: DepartmentType;
};

export const useOrganization = ({ type, userDepartment }: UseOrganizationProps) => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof OrganizationSchema>>({
    defaultValues:
      type === 'edit' && userDepartment
        ? {
            departmentCode: userDepartment.departmentCode,
            departmentName: userDepartment.departmentName,
            parentDepartmentId: userDepartment.parentDepartmentId,
          }
        : {
            departmentCode: '',
            departmentName: '',
            parentDepartmentId: '',
          },
    resolver: zodResolver(OrganizationSchema),
  });
  const onSubmit = (data: z.infer<typeof OrganizationSchema>) => {
    startTransition(() => {
      console.log(data);
    });
  };
  return { form, onSubmit, isPending };
};
