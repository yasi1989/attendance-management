import { z } from 'zod';

const MAX_MB = 5;
const MAX_FILE_SIZE = MAX_MB * 1024 * 1024;
const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

export const RouteInfoSchema = z.object({
  id: z.string().optional(),
  from: z.string().min(1, { message: '出発地は必須です' }),
  to: z.string().min(1, { message: '目的地は必須です' }),
  fare: z.number().min(1, { message: '運賃は1以上でなければなりません' }),
});

export const ExpenseFormSchema = z.object({
  id: z.string(),
  expenseType: z.enum(['Transport', 'General']).refine((val) => val !== undefined && val !== null, {
    message: '経費種別は必須です',
  }),
  expenseDate: z.date({
    message: '発生日は必須です',
  }),
  requestDate: z.date({
    message: '申請日は必須です',
  }),
  amount: z.number().min(1, { message: '金額は1以上でなければなりません' }),
  description: z.string().min(5, { message: '説明は5文字以上でなければなりません' }),
  receiptFile: z
    .custom<FileList>()
    .optional()
    .refine((files) => !files || files.length === 0 || files[0].size <= MAX_FILE_SIZE, {
      message: `ファイルサイズは${MAX_MB}MB以下でなければなりません`,
    })
    .refine((files) => !files || files.length === 0 || ACCEPTED_FILE_TYPES.includes(files[0].type), {
      message: 'ファイル形式はJPEG、PNG、GIF、WEBPのみです',
    }),
  routes: z.array(RouteInfoSchema).min(1, {
    message: '少なくとも1つの経路を追加してください',
  }),
});
