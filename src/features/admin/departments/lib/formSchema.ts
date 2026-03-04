import { z } from 'zod';
import { VALIDATIONS } from '@/consts/validate';

export const DepartmentSchema = z.object({
  id: z.string(),
  departmentName: z.string().min(VALIDATIONS.MIN_LENGTH, {
    message: '部署名は必須です。',
  }),
  parentDepartmentId: z.string().nullable().optional(),
  managerUserId: z.string().nullable().optional(),
});
