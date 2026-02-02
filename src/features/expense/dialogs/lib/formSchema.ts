import { z } from 'zod';
import { EXPENSE_CATEGORIES_LIST } from '@/consts/expense';
import { VALIDATIONS } from '@/consts/validate';

export const RouteInfoSchema = z.object({
  id: z.string().optional(),
  from: z.string().min(VALIDATIONS.MIN_LENGTH, { message: '出発地は必須です' }),
  to: z.string().min(VALIDATIONS.MIN_LENGTH, { message: '目的地は必須です' }),
  fare: z.number().min(VALIDATIONS.MIN_LENGTH, { message: '運賃を入力してください' }),
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
  amount: z.number().min(VALIDATIONS.MIN_LENGTH, { message: '金額を入力してください' }),
  description: z
    .string()
    .min(VALIDATIONS.MIN_LENGTH, { message: '説明を入力してください' })
    .max(VALIDATIONS.DESCRIPTION_MAX_LENGTH, {
      message: `説明は${VALIDATIONS.DESCRIPTION_MAX_LENGTH}文字以内で入力してください`,
    }),
  receiptFile: z
    .custom<FileList>()
    .optional()
    .refine((files) => !files || files.length === 0 || files[0].size <= VALIDATIONS.MAX_FILE_SIZE, {
      message: `ファイルサイズは${VALIDATIONS.MAX_MB}MB以下でなければなりません`,
    })
    .refine((files) => !files || files.length === 0 || VALIDATIONS.ACCEPTED_FILE_TYPES.includes(files[0].type), {
      message: 'ファイル形式はJPEG、PNG、GIF、WEBPのみです',
    }),
  routes: z.array(RouteInfoSchema).min(VALIDATIONS.MIN_LENGTH, {
    message: '少なくとも1つの経路を追加してください',
  }),
});
