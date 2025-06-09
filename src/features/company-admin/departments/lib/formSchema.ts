import { z } from 'zod';

export const DepartmentSchema = z.object({
  departmentName: z.string().min(1, {
    message: '部署名は必須です。',
  }),
  parentDepartmentId: z.string().optional(),
});
