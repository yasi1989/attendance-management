import { z } from 'zod';

const BaseLoginSchema = z.object({
  email: z.string().email({
    message: '有効なメールアドレスを入力してください。',
  }),
  password: z
    .string()
    .min(8, {
      message: 'パスワードは8文字以上で入力してください。',
    })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/, {
      message: 'パスワードには英小文字、英大文字、数字、特殊文字（!@#$%^&*）を含めてください。',
    }),
});

export const SignInSchema = BaseLoginSchema;
export const SignUpSchema = BaseLoginSchema.extend({
  name: z.string().min(3, {
    message: '名前は3文字以上で入力してください。',
  }),
});

export const RouteInfoSchema = z.object({
  id: z.string().optional(),
  from: z.string().min(1, { message: "出発地は必須です" }),
  to: z.string().min(1, { message: "目的地は必須です" }),
  fare: z.coerce
    .number()
    .min(0, { message: "運賃は0以上でなければなりません" }),
});

export const ExpenseFormSchema = z.object({
  requestDate: z.date({
    required_error: "申請日は必須です",
  }),
  amount: z.coerce
    .number({
      required_error: "金額は必須です",
      invalid_type_error: "金額は数値でなければなりません",
    })
    .min(0, { message: "金額は0以上でなければなりません" }),
  description: z
    .string()
    .min(5, { message: "説明は5文字以上でなければなりません" })
    .max(500, { message: "説明は500文字以内でなければなりません" }),
  statusId: z.string({
    required_error: "ステータスは必須です",
  }),
  receiptUrl: z.string().optional(),
  routes: z.array(RouteInfoSchema).min(1, {
    message: "少なくとも1つの経路を追加してください",
  }),
});