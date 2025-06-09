import { z } from 'zod';

export const DepartmentSchema = z.object({
  departmentCode: z
    .string()
    .min(1, {
      message: '部署コードは必須です。',
    })
    .max(10, {
      message: '部署コードは10文字以内で入力してください。',
    }),
  departmentName: z
    .string()
    .min(1, {
      message: '部署名は必須です。',
    })
    .max(100, {
      message: '部署名は100文字以内で入力してください。',
    }),
  parentDepartmentId: z.string().optional(),
});
