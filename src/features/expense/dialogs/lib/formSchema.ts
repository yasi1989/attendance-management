import { z } from 'zod';
import { EXPENSE_CATEGORIES, EXPENSE_CATEGORIES_LIST } from '@/consts/expense';
import { VALIDATIONS } from '@/consts/validate';

export const RouteInfoSchema = z.object({
  id: z.string().optional(),
  from: z.string(),
  to: z.string(),
  fare: z.number(),
});

export const ExpenseFormSchema = z
  .object({
    expenseType: z.enum(EXPENSE_CATEGORIES_LIST),
    expenseDate: z.date({ message: '発生日は必須です' }),
    amount: z.number().min(1, { message: '金額を入力してください' }),
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
    routes: z.array(RouteInfoSchema),
  })
  .superRefine((data, ctx) => {
    if (data.expenseType !== EXPENSE_CATEGORIES.TRANSPORT.value) return;

    if (data.routes.length === 0) {
      ctx.addIssue({ code: 'custom', message: '少なくとも1つの経路を追加してください', path: ['routes'] });
      return;
    }

    data.routes.forEach((route, index) => {
      if (!route.from) {
        ctx.addIssue({ code: 'custom', message: '出発地は必須です', path: ['routes', index, 'from'] });
      }
      if (!route.to) {
        ctx.addIssue({ code: 'custom', message: '目的地は必須です', path: ['routes', index, 'to'] });
      }
      if (!route.fare) {
        ctx.addIssue({ code: 'custom', message: '運賃を入力してください', path: ['routes', index, 'fare'] });
      }
    });
  });
