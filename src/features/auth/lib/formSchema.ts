import { z } from 'zod';

const BaseLoginSchema = z.object({
  email: z
    .email({
      message: '有効なメールアドレスを入力してください。',
    })
    .min(1, {
      message: 'メールアドレスは必須です。',
    })
    .max(255, {
      message: 'メールアドレスは255文字以内で入力してください。',
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
  name: z
    .string()
    .min(3, {
      message: '名前は3文字以上で入力してください。',
    })
    .max(255, {
      message: '名前は255文字以内で入力してください。',
    }),
});
