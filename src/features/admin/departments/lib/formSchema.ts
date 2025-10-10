import { VALIDATIONS } from '@/consts/validate';
import { z } from 'zod';

export const DepartmentSchema = z.object({
  departmentName: z.string().min(VALIDATIONS.MIN_LENGTH, {
    message: '部署名は必須です。',
  }),
  parentDepartmentId: z.string().optional(),
  managerUserId: z.string().optional(),
});
