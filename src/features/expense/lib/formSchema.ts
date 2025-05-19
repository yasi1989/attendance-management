import { z } from 'zod';

const MAX_MB = 5;
const MAX_FILE_SIZE = MAX_MB * 1024 * 1024;
const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

export const RouteInfoSchema = z.object({
  id: z.string().optional(),
  from: z.string().min(1, { message: '出発地は必須です' }),
  to: z.string().min(1, { message: '目的地は必須です' }),
  fare: z.coerce.number().min(0, { message: '運賃は0以上でなければなりません' }),
});

export const GeneralExpenseFormSchema = z.object({
  requestDate: z.string({
    required_error: '申請日は必須です',
  }),
  amount: z.coerce
    .number({
      required_error: '金額は必須です',
      invalid_type_error: '金額は数値でなければなりません',
    })
    .min(0, { message: '金額は0以上でなければなりません' }),
  description: z.string().min(5, { message: '説明は5文字以上でなければなりません' }),
  receiptFile: z
    .custom<FileList>()
    .optional()
    .refine((files) => !files || files[0].size <= MAX_FILE_SIZE, {
      message: `ファイルサイズは${MAX_MB}MB以下でなければなりません`,
    })
    .refine((files) => !files || ACCEPTED_FILE_TYPES.includes(files[0].type), {
      message: 'ファイル形式はJPEG、JPG、PNG、GIF、WEBPのみです',
    }),
});

export const TransportationExpenseFormSchema = z.object({
  requestDate: z.string({
    required_error: '申請日は必須です',
  }),
  amount: z.coerce
    .number({
      required_error: '金額は必須です',
      invalid_type_error: '金額は数値でなければなりません',
    })
    .min(0, { message: '金額は0以上でなければなりません' }),
  description: z.string().min(5, { message: '説明は5文字以上でなければなりません' }),
  receiptFile: z
    .custom<FileList>()
    .optional()
    .refine((files) => !files || files[0].size <= MAX_FILE_SIZE, {
      message: `ファイルサイズは${MAX_MB}MB以下でなければなりません`,
    })
    .refine((files) => !files || ACCEPTED_FILE_TYPES.includes(files[0].type), {
      message: 'ファイル形式はJPEG、JPG、PNG、GIF、WEBPのみです',
    }),
  routes: z.array(RouteInfoSchema).min(1, {
    message: '少なくとも1つの経路を追加してください',
  }),
});
