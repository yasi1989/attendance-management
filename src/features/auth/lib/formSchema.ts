import { VALIDATIONS } from '@/consts/validate';
import { z } from 'zod';

const BaseLoginSchema = z.object({
  email: z
    .string()
    .email({
      message: '有効なメールアドレスを入力してください。',
    })
    .min(1, {
      message: 'メールアドレスは必須です。',
    })
    .max(VALIDATIONS.EMAIL_MAX_LENGTH, {
      message: `${VALIDATIONS.EMAIL_MAX_LENGTH}文字以内で入力してください。`,
    }),
  password: z
    .string()
    .min(VALIDATIONS.MIN_PASSWORD_LENGTH, {
      message: `${VALIDATIONS.MIN_PASSWORD_LENGTH}文字以上で入力してください。`,
    })
    .max(VALIDATIONS.PASSWORD_MAX_LENGTH, {
      message: `${VALIDATIONS.PASSWORD_MAX_LENGTH}文字以内で入力してください。`,
    })
    .regex(VALIDATIONS.PASSWORD_REGEX, {
      message: 'パスワードには英小文字、英大文字、数字、特殊文字（!@#$%^&*）を含めてください。',
    }),
});

export const SignInSchema = BaseLoginSchema;
export const SignUpSchema = BaseLoginSchema.extend({
  name: z
    .string()
    .min(VALIDATIONS.MIN_LENGTH, {
      message: '名前は必須です。',
    })
    .max(VALIDATIONS.NAME_MAX_LENGTH, {
      message: `${VALIDATIONS.NAME_MAX_LENGTH}文字以内で入力してください。`,
    }),
});
