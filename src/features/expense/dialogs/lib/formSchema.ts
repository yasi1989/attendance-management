import { EXPENSE_CATEGORIES_LIST } from '@/consts/expense';
import { VALIDATION_LIMITS } from '@/consts/validate';
import { z } from 'zod';

export const RouteInfoSchema = z.object({
  id: z.string().optional(),
  from: z.string().min(VALIDATION_LIMITS.MIN_LENGTH, { message: '出発地は必須です' }),
  to: z.string().min(VALIDATION_LIMITS.MIN_LENGTH, { message: '目的地は必須です' }),
  fare: z.number().min(VALIDATION_LIMITS.MIN_LENGTH, { message: '運賃を入力してください' }),
});

export const ExpenseFormSchema = z.object({
  id: z.string(),
  expenseType: z.enum([...EXPENSE_CATEGORIES_LIST] as [string, ...string[]], {
    message: '経費種別は必須です',
  }),
  expenseDate: z.date({
    message: '発生日は必須です',
  }),
  requestDate: z.date({
    message: '申請日は必須です',
  }),
  amount: z.number().min(VALIDATION_LIMITS.MIN_LENGTH, { message: '金額を入力してください' }),
  description: z
    .string()
    .min(VALIDATION_LIMITS.MIN_LENGTH, { message: '説明を入力してください' })
    .max(VALIDATION_LIMITS.DESCRIPTION_MAX_LENGTH, {
      message: `説明は${VALIDATION_LIMITS.DESCRIPTION_MAX_LENGTH}文字以内で入力してください`,
    }),
  receiptFile: z
    .custom<FileList>()
    .optional()
    .refine((files) => !files || files.length === 0 || files[0].size <= VALIDATION_LIMITS.MAX_FILE_SIZE, {
      message: `ファイルサイズは${VALIDATION_LIMITS.MAX_MB}MB以下でなければなりません`,
    })
    .refine((files) => !files || files.length === 0 || VALIDATION_LIMITS.ACCEPTED_FILE_TYPES.includes(files[0].type), {
      message: 'ファイル形式はJPEG、PNG、GIF、WEBPのみです',
    }),
  routes: z.array(RouteInfoSchema).min(VALIDATION_LIMITS.MIN_LENGTH, {
    message: '少なくとも1つの経路を追加してください',
  }),
});
